const express = require('express');
const app = express()
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //store in req.body

const Person = require('./models/person.js')
const MenuItem = require('./models/MenuItem.js')

app.get('/', function(req, res) {
    res.send('Hello World!')
})

app.get('/sneha', function(req, res) {
    res.send("Hi I am Sneha");
})

app.post('/person', async (req, res) => {
    try{
        const data = req.body; //Assuming the req body conatins person data
        //Directly pass data to avoid this
        const newPerson = new Person(data);

        //save newPerson 
        const savedPerson = await newPerson.save();
        console.log('Data saved');
        res.status(200).json(savedPerson);
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }

    /*
    //Create new person doc using mongoose model
    // const newPerson = new Person();
    // newPerson.name = data.name;
    // newPerson.age = data.age;
    // newPerson.work = data.work;
    // newPerson.mobile = data.mobile;
    // newPerson.email = data.email;

    const data = req.body; //Assuming the req body conatins person data
        //Directly pass data to avoid this
        const newPerson = new Person(data);

        //save newPerson 
        newPerson.save((error, savedPerson) => {
            if(error) {
                console.log('Error in saving data', error);
                res.status(500).json({error: 'Internal Server Error'});
            }else {
                console.log('Data saved successfully');
                res.status(200).json(savedPerson);
            }
        })
    })
    */
})

app.get('/person', async (req, res) => {
    try{
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.post('/menu', async(req, res) => {
    try{
        const data = req.body;
        const newItem = new MenuItem(data);
        const savedItem = newItem.save();
        console.log('Item saved');
        res.status(200).json(savedItem);
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

app.get('/menu', async(req, res) => {
    try{
        const data = await MenuItem.find();
        console.log('Data fetched');
        res.status(200).json(data);
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

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