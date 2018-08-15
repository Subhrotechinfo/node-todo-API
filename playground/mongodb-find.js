//const MongoClient = require('mongodb').MongoClient;
const {MongoClient , ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {

    if(err){
      console.log('Unable to Connect to MongoDb Server');
    }

    console.log('Connected to MongoDB Server');

    // db.collection('Todos').find({
    //   _id : new ObjectID('5b72f400243a203f7c6fd22a')
    // }).toArray().then( (docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err) => {
    //     console.log('Unable to fetch todos',err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // },(err) => {
    //     console.log('Unable to fetch todos',err);
    // });

    db.collection('Users').find({name:'Subhro'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    });

    db.close();
});
