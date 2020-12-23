var express = require('express');
var app = express();
require('dotenv').config()
const mongoose = require('mongoose');


var dbConn= mongoose.connect(process.env.DB_CONN_STRING , {useUnifiedTopology: true}, (err) => {
    if (!err) {
        console.log('Successfully Established Connection with MongoDB')
    }
    else {
        console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
    }
});
module.exports=app