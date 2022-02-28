require('dotenv').config(); // for reading env file
const mongoose  = require('mongoose');

const DB_PASSWORD = process.env.DB_PASSWORD;  // database password

//connect function  that connect application with database
const connect  = () =>{
    return mongoose.connect(`mongodb+srv://rahulyadav:${DB_PASSWORD}@cluster0.gupru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
}

module.exports = connect;