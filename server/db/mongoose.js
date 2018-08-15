var mongoose = require('mongoose');

//use build in library
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoAppMongoose');

module.exports = {mongoose};
