var express = require('express');
var app = express();
require('dotenv').config()
var Employee=require('./src/models/employee_model');
var Department= require('./src/models/department_model');
var EmployeeAPI=require('./src/routes/employee');
var DepartmentAPI=require('./src/routes/department');
var dbConn=require('./src/models/dbConn');
app.use('/',EmployeeAPI)
app.use('/',DepartmentAPI)
app.use('/',dbConn)
const bodyParser= require('body-parser')
const { body, validationResult } = require('express-validator');
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}));

app.get('/',(req,res)=>{
    res.send('Welcome to Crud Operations' ); 
    
});




app.listen(3000);