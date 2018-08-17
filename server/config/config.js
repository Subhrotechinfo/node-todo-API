var env = process.env.NODE_ENV || 'development';
console.log('environment',env);

if(env === 'development'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://username:password@ds123532.mlab.com:23532/todoappmongoose';
}else if(env === 'test'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppMongoose'
}else if(env === 'production'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI ='mongodb://username:password@ds123532.mlab.com:23532/todoappmongoose';
}
