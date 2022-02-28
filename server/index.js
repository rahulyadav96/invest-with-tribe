const express = require('express');
require('dotenv').config(); // for reading env file

const app = express();
app.use(express.json());

//controllers
const userControllers = require("./controllers/user.controller");
const {signup, signin} = require("./controllers/auth.controller");
//routes

app.use('/users',userControllers);
app.use('/signup',signup);
app.use('/signin',signin);

module.exports = app;
