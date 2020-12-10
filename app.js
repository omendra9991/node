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
const ejsLint = require('ejs-lint');

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
//get api for showing department list on create employee form.
app.get('/departmentDropdown/', function(req, res, next) {
    department
        .find({})
        .exec(function(err, products) {
            department.countDocuments().exec(function(err, count) {
                if (err) return next(err)
                else{
                    res.render('employeeForm', {
                        department: products
                    
                    })
                } 

            })
        })
})
// get list of employee
app.get("/users/", (req, res) => {
    employee.find({}, (err, result) => {
        if(err) {
            res.status(200).json({error: err});
        } else {
            res.status(200).json(result);
        } 
    });
});
//post the employee in database
app.post('/employee/', [ body('employeeCode').isLength({ min: 4, max:4 }) ],function (req, res,next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else{
        var myData = new employee(req.body);
        myData.save(function(err, user) {
            console.log("hello");
            if (err) return next(err)
            else{
                alert("employee inserted");
            }
            }) 
    }       
    // res.send("item saved to database");
    res.sendFile(__dirname + "/public/index.html");
});

 //delete selected employee
app.delete('/employee/:id', async(req, res) => {
    const id = req.params.id;
    employee.deleteOne({_id: id}, (err) => {
        if(err) {
            res.status(200).json({error: err});
        }
    }).then(res => {
        alert("employee deleted");
        res.status(200).json({message: "Ok"});
    });
    
    
} );
// get employee with id
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
// update employee with id
app.put('/employee/:id',[ body('employeeCode').isLength({ min: 4, max:4 }) ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        alert("employe code should be of length 4");
        // return res.status(400).json({ errors: errors.array() });
    }
    else{
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
                alert("Employee Detals Updated");
            })
            .catch(error => console.error(error))
        }
        
    })

//pagination employee
app.get('/employee/:page', async(req, res, next)=> {
    var perPage = 5
    var page = req.params.page || 1
   await  department.find({}, (err, result) => {
            if(err) {
                res.status(200).json({error: err});
            } else {
                 employee
                .find({}).sort( { empName : 1} )
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .exec(function(err, products) {
                    employee.count().exec(function(err, count) {
                        if (err) return next(err)
                        res.render('employee', {
                            employee: products,
                            departmen:result,
                            current: page,
                            pages: Math.ceil(count / perPage)
                        })
                    })
                })
            } 
        });
   
})
//search employee
app.get('/employee/searchEmployee/:page/:text/:filterDept', async(req, res, next)=>{
    var perPage = 5;
    var page= req.params.page;
    var dept= req.params.filterDept;
    if(page=="1"){
         page =  1
    }
    else{
        
    }
    var from=page*perPage-(perPage-1);
    var to= page*perPage;
    // let deptName = document.getElementById("searchingText").value;
    var text= req.params.text;
    console.log(text);
    await employee.find({ $or: [ { empName: text}, { department: dept } ] }, (err, result) => {
        if(err) {
            res.status(200).json({error: err});
        } else {
           
        } 
    }).sort( { empName : 1} ).skip((perPage * page) - perPage)
    .limit(perPage).exec(function(err, products) {
        employee.count().exec(function(err, count) {
            if (err) return next(err)
            res.render('searchEmployee', { 
                employee: products,
                from:from,
                to:to,
                current: page,
                pages: Math.ceil(count / perPage),
                Text: text,
                filterDept:dept
            })
        })
    });
})

//department crud
//get department list
app.get("/department", (req, res) => {
    department.find({}, (err, result) => {
        if(err) {
            res.status(200).json({error: err});
        } else {
            res.status(200).json(result);
        } 
    });
});
//post department data into database
app.post('/department',[ body('deptCode').isLength({ min: 2, max:4 }) ], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else{
        var myData = new department(req.body);
        myData.save(function(err, user) {
            if (err) {
            alert("duplicate value");
            }

        
        });
    }
    
    res.sendFile(__dirname + "/public/index.html");
});
//delete department with id
app.delete('/department/:id', async(req, res) => {
    const id = req.params.id;
    department.deleteOne({_id: id}, (err) => {
        if(err) {
            res.status(200).json({error: err});
        }
    }).then(res => {
        alert("department deleted");
        res.status(200).json({message: "Ok"});
    });
    
    
} );
// get department with id
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

//update deprtment with id
app.put('/department/:id',[ body('deptCode').isLength({ min: 2, max:4 }) ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        alert("department code should be of length 2-4");
        // return res.status(400).json({ errors: errors.array() });
    }
    else{
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
                alert("department updated");           
            })
            .catch(error => console.error(error))
        }
  })
//pagination department

app.get('/depart/:page', async(req, res, next)=> {
    var perPage = 5
    var page = req.params.page || 1
    var from=page*perPage-(perPage-1);
    var to= page*perPage;
   await department
        .find({}).sort( { deptName : 1} )
        .skip((perPage * page) - perPage)
        .limit(perPage)
       
        .exec(function(err, products) {
           
            department.count().exec(function(err, count) {
                
                if (err) return next(err)
                    // res.status(200).json(products);
                    res.render('department', {
                        department: products,
                        from:from,
                        to:to,
                        current: page,
                        pages: Math.ceil(count / perPage)
                    })
            })
        })
})
//search department
app.get('/depart/1/searchDepartment/:text', async(req, res, next)=>{
    // let deptName = document.getElementById("searchingText").value;
    var text= req.params.text;
    console.log(text);
    await department.find({"deptName": text}, (err, result) => {
        if(err) {
            res.status(200).json({error: err});
        } else {
            // res.status(200).json(result);
            res.render('department', {
                department: result,
                current: 1,
                pages: 1
            })
        } 
    }).sort( { deptName : 1} );
})


app.listen(3000);