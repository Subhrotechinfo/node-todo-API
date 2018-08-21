require('./config/config');
//lodash
const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

//imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

const port = process.env.PORT;
app.use(bodyParser.json());

// app.get('/',(req,res) => {
//   //add the home page
// });

//POST
app.post('/todos', authenticate, async (req, res) => {
  try{
    //console.log(req.body);
    var todo = new Todo({
      text: req.body.text,
      _creator:req.user._id
    });
    const doc = await todo.save();
    res.send(doc);
  }catch(e){
    res.status(400).send(e);
  }
  });

app.get('/todos', authenticate, async (req,res) => {
  try{
    const todos =await Todo.find({
        _creator:req.user._id
    });
    res.send({todos});
  }catch(e){
        res.status(400).send(e);
  }
});

//GET by ID /todos/12345
app.get('/todos/:id',authenticate, async (req, res) => {
  try{
    //request..params is an object{Key,Value} pair
    //res.send(req.params);
    var  id = req.params.id;
    //validate the ObjectID - using isValid
    if(!ObjectID.isValid(id)){
      return res.status(404).send();
    }
    const todo = await Todo.findOne({
      _id:id,
      _creator:req.user._id
    });

    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});

  }catch(e){
    res.status(400).send();
  }
});

//delete route
app.delete('/todos/:id',authenticate, async (req,res) => {
  try{
    //get the id
    var id = req.params.id;
    //validate the id --> not valid return 404
    if(!ObjectID.isValid(id)){
      return res.status(404).send();
    }
    //remove todo by id
    const todo =await Todo.findOneAndRemove({
      _id:id,
      _creator:req.user._id
    });

    //success
      //if no doc , send 404
      if(!todo){
        return res.status(404).send();
      }
      //if doc , send 200
      res.status(200).send({todo});
  }catch(e){
    //error
      //400 with empty body
      res.status(400).send();
  }
});

//Update
app.patch('/todos/:id', authenticate, async (req,res) => {
    try{
      var id = req.params.id;
      var body  = _.pick(req.body, ['text','completed']);

      if(!ObjectID.isValid(id)){
        return res.status(404).send();
      }
      if(_.isBoolean(body.completed) && body.completed){
          body.completedAt = new Date().getTime();
      }else{
          body.completed = false;
          body.completedAt = null;
      }
      var todo = await Todo.findOneAndUpdate({_id:id,_creator:req.user._id}, {$set:body}, {new : true});
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});
    }catch(e){
        res.status(400).send();
    }
});

//POST users
app.post('/users', async (req,res) => {
  try{
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth',token).send(user);
  }catch(e){
    res.status(400).send(e);
  }
});

//private route
app.get('/users/me', authenticate, (req,res) => {
     res.send(req.user);
});

//POST /users/login(email,password)
app.post('/users/login' , async (req,res) => {
  try{
    const body = _.pick(req.body,['email','password']);
    const user = await User.findByCredentials(body.email,body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth',token).send(user);
  }catch(e){
    res.status(400).send();
  }
});

app.delete('/users/me/token',authenticate, async (req,res) => {
  try{
    await req.user.removeToken(req.token);
    res.status(200).send();
  }catch(e){
    res.status(400).send();
  }
});

 app.listen(port,() => {
  console.log(`Started on port ${port}.`);
});

module.exports = {app};
