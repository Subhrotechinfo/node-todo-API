//const MongoClient = require('mongodb').MongoClient;
const {MongoClient , ObjectID} = require('mongodb');

var obj =  new ObjectID();
console.log(obj);

//Object Destructuring
// var user  = { name:'Subhro' , age:27 };
// var {name}  = user;
// console.log('Name: ', name);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {

    if(err){
      console.log('Unable to Connect to MongoDb Server');
    }

    console.log('Connected to MongoDB Server');

    //const db = client.db('TodoApp');
    //Insert Data
    // db.collection('Todos').insertOne({
    //   text:'Something to do',
    //   completed: false
    // }, (err,result) => {
    //   if(err){
    //     return console.log('Unable to insert todo',err);
    //   }
    //   console.log(JSON.stringify(result.ops , undefined , 2));
    // });

    //Insert new doc into Users (name, age, location)
    // db.collection('Users').insertOne({
    //   name:'Subhro',
    //   age:27,
    //   location:'Bangalore'
    // }, (err,result) => {
    //     if(err){
    //       return console.log('Unable to insert user',err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    //
    // });

    db.close();
});
