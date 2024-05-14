const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.set('strictQuery', true);

const mongoUrl = 'mongodb://localhost:27017/hotels';

let isConnected;

module.exports.connectToDatabase = async () => {
  if (isConnected) {
    return Promise.resolve();
  }
  mongoose.connection.on('connected', () => {
    console.log('MongoDB database connection established successfully');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('Mongo Connection Reestablished');
  });

  mongoose.connection.on('error', (error) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running: ');
    console.log(`Mongo Connection ERROR: ${error}`);
  });

  mongoose.connection.on('close', () => {
    console.log('Mongo Connection Closed...');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('MongoDB database connection is disconnected due to app termination...');
      process.exit(0);
    });
  });

  return dbConnection = await mongoose.connect(mongoUrl, {
    maxPoolSize: 10,
    maxIdleTimeMS: 10000,
  })
    .then((db) => {
      isConnected = db.connections[0].readyState;
    });
};