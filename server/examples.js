var {mongoose} = require('./db/mongoose');


//first toDo
// var newTodo = new Todo({
//   text:'Cook dinner'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved Todo',doc);
// },(e) => {
//   console.log('Unable to save toDo');
// });

//second todos
 var otherTodo = new Todo({
  // text:'Coking done',
  // completed:true,
  // completedAt:123
  text:'Something to do'
});
// otherTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc,undefined,2));
// },(e) => {
//     console.log('Unable to save otherTodo',e);
// });

//User
//email - require it - trim it -  set type - set min length of 1


var user = new User({
  email:'subhro@example.com'
});

user.save().then((doc) => {
    console.log('User saved : ',doc);
},(e) => {
    console.log('Unable to save User ',e);
});
