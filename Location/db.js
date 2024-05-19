const mongoose = require('mongoose');
const Users = require('./models/Users');
const geolib = require('geolib');
const haversine = require('./haversine');
const mongoUrl = 'mongodb://localhost:27017/user';

mongoose.connect(mongoUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async () => {
    console.log('Connected to MongoDB');

    // Insert dummy users
    const dummyUsers = [
        { name: 'Alice', age: 25, latitude: 28.504008705760405, longitude: 77.06735781916512 },
        { name: 'Bob', age: 30, latitude: 28.6519, longitude: 77.2318 },
        { name: 'Sneha', age: 21, latitude: 28.502943299504327, longitude: 77.06725589522058 },
        { name: 'Radha', age: 25, latitude: 20.6519, longitude: 66.2315 },  
        { name: 'Sita', age: 30, latitude: 28.6519, longitude: 77.2315 }
    ];

    try {
        await Users.insertMany(dummyUsers);
        console.log('Dummy users added successfully');

        //Get current location by IP 
        const fetch = await import('node-fetch');        //dynamic import
        const url = 'https://ipinfo.io/json';
        const ipInfoRes = await fetch.default(url);
        const ipInfoData = await ipInfoRes.json();
        const { loc } = ipInfoData;  
        //const [curLatitude, curLongitude] = loc.split(',').map(Number);
        const curLatitude = 28.503494764715477;
        const curLongitude = 77.06713917966628;
        console.log("Current Latitude", curLatitude);
        console.log("Current Longitude", curLongitude);
        
        const radius = 5;

        const users = await Users.find(); 

        // Filter user within specified range
        const userInRange = dummyUsers.filter( user => {
            const userLatitude = user.latitude
            const userLongitude = user.longitude
            if( userLatitude && userLongitude ) { 
                const distance = haversine(curLatitude, curLongitude, userLatitude, userLongitude )
                console.log(`Distance of ${user.name} is ${distance}`);
                return distance <= radius;
            }
            return false;
        });
        console.log(`Number of users within ${radius} meters of the target location in India: ${userInRange.length}`);
        console.log('Users within the specified radius:');
        userInRange.forEach(user => {
            console.log(`${user.name} - Latitude: ${user.latitude}, Longitude: ${user.longitude}`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.disconnect();
    }
});