const express = require('express');
require('dotenv').config(); // for reading env file

const app = express();
app.use(express.json());

//controllers
const userControllers = require("./controllers/user.controller");

//routes

app.use('/users',userControllers);


module.exports = app;
