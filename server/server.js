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

var app = express();

const port = process.env.PORT;
app.use(bodyParser.json());

//POST
app.post('/todos', (req, res) => {
    //Testing
    //console.log(req.body);
    var todo = new Todo({
      text: req.body.text
    });

    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  });

app.get('/todos' , (req,res) => {
  Todo.find().then((todos)=>{
      res.send({todos});
  }, (e) =>{
      res.status(400).send(e);
  });
});

//GET by ID /todos/12345
app.get('/todos/:id',(req, res) => {
  //request..params is an object{Key,Value} pair
  //res.send(req.params);
  var  id = req.params.id;
  //validate the ObjectID - using isValid
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});
  }).catch((e) =>  {
    res.status(400).send();
  });

});
//delete route
app.delete('/todos/:id',(req,res) => {
  //get the id
  var id = req.params.id;
  //validate the id --> not valid return 404
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  //remove todo by id
    Todo.findByIdAndRemove(id).then((todo) => {
      //success
        //if no doc , send 404
        if(!todo){
          return res.status(404).send();
        }
        //if doc , send 200
        res.status(200).send({todo});
    }).catch(() => {
      //error
        //400 with empty body
        res.status(400).send();
    });
});

//Update
app.patch('/todos/:id',(req,res) => {
    var id = req.params.id;
    var body  = _.pick(req.body, ['text','completed']);

    if(!ObjectID.isValid(id)){
      return res.status(404).send();
    }
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.compltedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set:body}, {new : true}).then((todo) => {
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port,() => {
  console.log(`Started on port ${port}.`);
});

module.exports = {app};
