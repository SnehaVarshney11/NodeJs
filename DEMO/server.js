const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("./auth.js");
const { connectToDatabase } = require("./db.js");
app.use(bodyParser.json());
app.use(passport.initialize());
require("dotenv").config();

const PORT = process.env.PORT || 3000;

connectToDatabase();

const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next();
};
app.use(logRequest);

// Routes
const personRoutes = require("./routes/personRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");
const milkRoutes = require("./routes/milkRoutes.js");

const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/person", personRoutes);
app.use("/menu", localAuthMiddleware, menuRoutes);
app.use("/milk", milkRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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
