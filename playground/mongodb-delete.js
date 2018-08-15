//const MongoClient = require('mongodb').MongoClient;
const {MongoClient , ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err , db) => {
    if(err){
      console.log('Unable to Connect to MongoDb Server');
    }
    console.log('Connected to MongoDB Server');

    //deleteMany
    // db.collection('Todos').deleteMany({text:'Graceful Life'}).then((result) => {
    //   console.log(result);
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text:'Graceful Life'}).then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed:false}).then((result) => {
    //   console.log(result);
    // });

    // db.collection('Users').deleteMany({name:'Subhro'}).then((result) => {
    //   console.log(result);
    // });

db.collection('Users').findOneAndDelete({_id : new ObjectID("5b72f647e66e3c1658925f14")}).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });

    db.close();
});
