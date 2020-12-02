var express = require('express');
var app = express();
var ejs = require('ejs')
var Employee=require('./employee_model');
var Department= require('./department_model');
const bodyParser= require('body-parser')
const mongoose = require('mongoose');
let alert = require('alert');  
const { body, validationResult } = require('express-validator');
const paginate = require('express-paginate');

app.set('view engine', 'ejs')


app.use(paginate.middleware(2, 5));
app.use(bodyParser.urlencoded({ extended: true }))
var dbConn= mongoose.connect('mongodb+srv://omendra:omendra@cluster0.zynjw.mongodb.net/test', {useUnifiedTopology: true}, (err) => {
if (!err) {
console.log('Successfully Established Connection with MongoDB')
}
else {
console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
}
});
const employee = mongoose.model('Employee');
const department = mongoose.model('Department');
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}));
app.use('/public',express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
});
app.get('/departmentDropdown/', function(req, res, next) {
    
    // var page = req.params.page || 1

    department
        .find({})
        .exec(function(err, products) {
            department.countDocuments().exec(function(err, count) {
                if (err) return next(err)
                res.render('employeeForm', {
                    department: products
                   
                })
            })
        })
})

app.get("/users", (req, res) => {
    employee.find({}, (err, result) => {
        if(err) {
            res.status(200).json({error: err});
        } else {
            res.status(200).json(result);
        } 
    });
});
app.post('/employee', function (req, res) {
    var myData = new employee(req.body);
    myData.save(function(err, user) {
        console.log("hello");
        if (err) {
            alert("Employee Code shoud be unique");
        }
        else{
            alert("employee inserted");
        }
        
        }) 
    
   
    // res.send("item saved to database");
    res.sendFile(__dirname + "/public/index.html");
});

 
app.delete('/employee/:id', async(req, res) => {
    const id = req.params.id;
    employee.deleteOne({_id: id}, (err) => {
        if(err) {
            res.status(200).json({error: err});
        }
    }).then(res => {
        res.status(200).json({message: "Ok"});
    });
    
    
} );

app.get("/users/:id", async(req, res) => {
    const id = req.params.id;
    console.log(id);
    employee.find({"_id": id}, (err, result) => {
        if(err) {
            res.status(200).json({error: err});
        } else {
            res.status(200).json(result);
        } 
    });
});
// update row
app.put('/employee/:id', (req, res) => {
    console.log(req.body.empName);
    const id = req.params.id;
    employee.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            empName: req.body.empName,
            employeeCode:  req.body.employeeCode,
            department: req.body.department,
            DOJ: req.body.DOJ
          }
        },
        {
          upsert: true
        }
      )
        .then(result => {
           })
        .catch(error => console.error(error))
  })
//pagination employee
app.get('/employee/:page', function(req, res, next) {
    var perPage = 5
    var page = req.params.page || 1

    employee
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
            employee.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('employee', {
                    employee: products,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})


//department crud

app.get("/department", (req, res) => {
    department.find({}, (err, result) => {
        if(err) {
            res.status(200).json({error: err});
        } else {
            res.status(200).json(result);
        } 
    });
});
app.post('/department', function (req, res) {
    var myData = new department(req.body);
    myData.save(function(err, user) {
        if (err) {
           alert("duplicate value");
        }

       
    });
    
    res.sendFile(__dirname + "/public/index.html");
});

app.delete('/department/:id', async(req, res) => {
    const id = req.params.id;
    department.deleteOne({_id: id}, (err) => {
        if(err) {
            res.status(200).json({error: err});
        }
    }).then(res => {
        res.status(200).json({message: "Ok"});
    });
    
    
} );
app.get("/department/:id", async(req, res) => {
    const id = req.params.id;
    console.log(id);
    department.find({"_id": id}, (err, result) => {
        if(err) {
            res.status(200).json({error: err});
        } else {
            res.status(200).json(result);
        } 
    });
});
app.put('/department/:id', (req, res) => {
    
    const iid = req.params.id;
    department.findOneAndUpdate(
        { _id: iid },
        {
          $set: {
            deptName: req.body.deptName,
            deptCode:  req.body.deptCode,
            details: req.body.details
            
            
          }
        },
        {
          upsert: true
        }
      )
        .then(result => {
            
           })
        .catch(error => console.error(error))
  })
//pagination department

app.get('/depart/:page', function(req, res, next) {
    var perPage = 5
    var page = req.params.page || 1
    department
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
       
        .exec(function(err, products) {
           
            department.count().exec(function(err, count) {
                
                if (err) return next(err)
                res.render('department', {
                    department: products,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})



app.listen(3000);