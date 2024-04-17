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