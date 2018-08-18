const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {app} = require('./../server');
const {todos,populateTodos,users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

   it('Should not create todo with invalid body data',(done) =>{
          request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res) => {
               if(err){
                 return done(err);
               }
              Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
              }).catch((e) => done(e));
            });
   });
});

describe('GET /todos',() => {
  it('Should get all todos',(done) => {

    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id',() => {
  it('Should return todo doc', (done) => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
  });

     it('should return 404 if todo not found', (done) => {
      //make sure you get a 404 back
      //testing
      //var hexId =  '1231556';
      var hexId = new ObjectID().toHexString();
      //console.log(hexId);
      request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('Should return 404 for non-Object ids', (done) => {
      request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done);
  });
});

describe('DELETE /todos/:id', () => {
    it('Should remove a todo',(done) =>{
        var hexId  = todos[1]._id.toHexString();
        request(app)
          .delete(`/todos/${hexId}`)
          .expect(200)
          .expect((res) => {
              expect(res.body.todo._id).toBe(hexId);
          })
          .end((err,res) => {
              if(err){
                return done(err);
              }
              //query the database using findById
              Todo.findById(hexId).then((todo) => {
                  expect(todo).toNotExist();
                  done();
                  //expect(null).toNotExist();
              }).catch((e) => done(e));
          });
    });
    it('Should return 404 if todo not found',(done) => {
      var hexId = new ObjectID().toHexString();
      request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });
    it('Should return 404 if object id is invalid',(done) => {
      request(app)
        .delete('/todos/123abc')
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/:id' ,() => {
    it('Should update the todo',(done) =>{
      //grabbing the id
      var hexId = todos[0]._id.toHexString();
      var text  = 'This should be the new text';
      //update the text , set completed true
      //200
      request(app)
        .patch(`/todos/${hexId}`)
        .send({
          completed:true,
          text:text
        })
        .expect(200)
        .expect((res) => {
          //text is changed , completed is true , completedAt is a number , .toBeA
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(true);
          expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);
    });

    it('Should clear completedAt when todo is not completed',(done) =>{
      //grap id of second todo item
      var hexId = todos[1]._id.toHexString();
      var text  = 'This should be the new text for the second';
      //update text ,set completed to false
      //200
      request(app)
        .patch(`/todos/${hexId}`)
        .send({
          completed:false,
          text
        })
        .expect(200)
        .expect((res) => {
          //text is changed , completed false ,  completedAt is null .toNotExist
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(false);
          expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);
    });
});
//test cases for user route
describe('GET /users/me',() => {
  it('Should return user if authenticated',(done) => {
    request(app)
      .get('/users/me')
      .set('x-auth',users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('Should return a 401 if  not authenticated',(done) => {
      request(app)
        .get('/users/me')
        .expect(401)
        .expect((res) => {
            expect(res.body).toEqual({});
        })
        .end(done);
  });
});
//testcases for sign-up route
describe('POST /users',() => {
  it('Should create a user',(done) =>{
    var email = 'subhro.yo@gmail.com';
    var password = 'asdf123';
    request(app)
      .post('/users')
      .send({email,password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
          if(err){
            return done(err);
          }
          User.findOne({email}).then((user) => {
            expect(user).toExist();
            expect(user.password).toNotBe(password);
            done();
          });
      });
  });

  it('Should return validation error if request is invalid',(done) => {
    var invalidEmail = 'ababsb';
    var invalidPass = 'kbssb';
      request(app)
        .post('/users')
        .send({invalidEmail,invalidPass})
        .expect(400)
        .end(done);
  });

  it('Should not create user if email in use',(done) => {
    //var existingEmail =users[0].email;
    //var existingPassword = 'Password123!';
    request(app)
      .post('/users')
      .send({ email:users[0].email,password:'Password123!'})
      .expect(400)
      .end(done);
  });
});
