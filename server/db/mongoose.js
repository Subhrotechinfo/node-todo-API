//var {MONGODB_URI} = require('./../config/config');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongodb://localhost:27017/TodoAppMongoose
//mongodb://<dbuser>:<dbpassword>@ds123852.mlab.com:23852/todoapi
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoAppMongoose');
module.exports = {mongoose};
