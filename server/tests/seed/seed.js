const {ObjectID}  =require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo}  = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId  = new ObjectID();
const userTwoId =  new ObjectID();
//dummy users array
const users = [{
    _id:userOneId,
    email:'subhro.rj@gmail.com',
    password:'userOnePass',
    tokens:[{
      access:'auth',
      token:jwt.sign({_id:userOneId ,access:'auth'},'salt123').toString()
    }]
},{
  _id:userTwoId,
  email:'subhro.teckinfo@gmail.com',
  password:'userOnePass'
}];

//make an array of dummy todos
const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed:true,
  completedAt :333
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers  = (done) => {
    User.remove({}).then(() => {
       var userOne = new User(users[0]).save();
       var userTwo = new User(users[1]).save();

       return Promise.all([userOne,userTwo]);
    }).then(() => done());
};

module.exports= {todos,populateTodos,users,populateUsers};
