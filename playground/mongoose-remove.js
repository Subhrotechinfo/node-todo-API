const {ObjectID}  = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo}  = require('./../server/models/todo');
const {User} = require('./../server/models/user');


//Todo.remove()

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

//Todo.findOneAndRemove()
Todo.findOneAndRemove({_id:'5b76993cb62cbf538d79c042'}).then((todo) =>{
  console.log(todo);
});

//Todo.findByIdAndRemove() --> returns doc
// Todo.findByIdAndRemove('5b769895b62cbf538d79c024').then((todo) => {
//   console.log(todo);
// });
