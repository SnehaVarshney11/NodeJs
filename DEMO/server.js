const express = require('express');
const app = express()
const db = require('./db');

const bodyParser = require('body-parser');
const MenuItem = require('./models/MenuItem.js')

app.use(bodyParser.json()); //store in req.body

const personRoutes = require('./routes/personRoutes.js')
const menuRoutes = require('./routes/menuRoutes.js')

app.get('/', function(req, res) {
    res.send('Hello World!')
})

app.get('/sneha', function(req, res) {
    res.send("Hi I am Sneha");
})

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(3000, ()=> {
    console.log('Server is running on port 3000');
})


/*
-------------DEMO--------------------------
var fs = require('fs');
var os = require('os');

var user = os.userInfo();
console.log(user);

fs.appendFile('greet.txt', 'Hi ' + user.username + '\n' ,  () => {
    console.log("This is callback function");
})

const demo = require('./demo.js')
var age = demo.age
console.log("Age is : " + age);

var _ = require('lodash');

var arr = ["A", "A", "B", 1, 2, 1, 3, 1, 2];
var filteredArr = _.uniq(arr)
console.log("Filtered array " + filteredArr);
*/