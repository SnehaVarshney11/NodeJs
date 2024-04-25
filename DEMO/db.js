// Responsible for db connection 
const mongoose = require('mongoose');

//Define MongoDb url
const mongoUrl = 'mongodb://localhost:27017/hotels';

//Set up MongoDB connection
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get default connect
const db = mongoose.connection;

//Add event Listener for db connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.log('Connected to MongoDB server', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

//Export the db connection
module.exports = db;