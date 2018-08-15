//const MongoClient = require('mongodb').MongoClient;
const {MongoClient , ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err , db) => {
    if(err){
      console.log('Unable to Connect to MongoDb Server');
    }
    console.log('Connected to MongoDB Server');

    //updating the value of a field
    // db.collection('Todos').findOneAndUpdate({
    //   _id: new ObjectID('5b73bdc8bfeb9a61d735ca86')
    // },{
    //     $set: {completed:false}
    // },{
    //   returnOriginal:false
    // }).then((result) => {
    //   console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
      _id: new ObjectID('5b73cb38bfeb9a61d735cc2c')
    },{
            $set: {name:'Subhro'},
            $inc  : {age:1 }
    },{
          returnOriginal:false
    }).then((result) => {
          console.log(result);
    });


    db.close();
});
