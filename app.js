var express = require('express');
var app = express();
require('dotenv').config()
const mongoose = require('mongoose');

var Employee=require('./src/models/employee_model');
var Department= require('./src/models/department_model');
var localuser=require('./src/models/localStrategy_model');
var EmployeeAPI=require('./src/routes/employee');
var DepartmentAPI=require('./src/routes/department');
var LocalStretagyPassportAPI=require('./src/routes/localStrategy_passort');

var dbConn=require('./src/models/dbConn');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const bodyParser= require('body-parser')
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}));
app.use('/',EmployeeAPI)
app.use('/',DepartmentAPI)
app.use('/',dbConn)
app.use('/',LocalStretagyPassportAPI)
app.get('/',(req,res)=>{
    res.send('Welcome to Crud Operations' ); 
    
});
app.get('/user',(req,res)=>{
  res.send('Welcome to user page' ); 
  
});



module.exports = app.listen(3000);