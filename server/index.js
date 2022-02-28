const express = require('express');
require('dotenv').config(); // for reading env file

const app = express();
app.use(express.json());


module.exports = app;
