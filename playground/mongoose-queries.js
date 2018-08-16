const {ObjectID}  = require('mongodb');


const {mongoose} = require('./../server/db/mongoose');
const {Todo}  = require('./../server/models/todo');

const {User} = require('./../server/models/user');

// var id = '5b7517d1085017fc0ac9fb5611';

//validating the ObjectIDs from DB
// if(!ObjectID.isValid(id)){
//   console.log('Id  not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos' ,todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo' ,todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//       return console.log('Id not found');
//     }
//   console.log('Todo By Id' ,todo);
// }).catch((e) => console.log(e));


//User.findById()
//copy the id
var uid = '5b7420e8f43d52942ac6dd7f';

//use the id to pass it to the function
User.findById(uid).then((user) => {
    if(!user){
      return console.log('Unable to find user');
    }

    console.log(JSON.stringify(user, undefined, 2));
},(e) => {
    console.log(e);
});
