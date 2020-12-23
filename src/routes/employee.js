var express = require('express');
var app = express();
const bodyParser= require('body-parser')
const mongoose = require('mongoose');
let alert = require('alert');  
const { body, validationResult } = require('express-validator');
app.use(bodyParser.urlencoded({ extended: true }))
const employee = mongoose.model('Employee');
const department = mongoose.model('Department');

// get list of employee
app.get("/getEmployeeList/", (req, res) => {
    employee.find({}, (err, result) => {
        if(err) {
            res.status(200).json({error: err});
        } else {
            res.status(200).json(result);
        } 
    });
});

//add the employee in database
app.post('/addEmployee/', [ body('employeeCode').isLength({ min: 4, max:4 }) ],function (req, res,next) {
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
    // res.sendFile(__dirname + "/src/public/index.html");
});

 //delete selected employee
app.delete('/deleteEmployee/:id', async(req, res) => {
    const id = req.params.id;
    employee.deleteOne({_id: id}, (err) => {
        if(err) {
            res.status(200).json({error: err});
        }
        res.status(200).json({message: "Ok, Deleted"});
    }).then(res => {
        
        res.status(200).json({message: "Ok"});
    });
    
    
} );
// get employee with id
app.get("/getEmployee/:id", async(req, res) => {
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
app.put('/employeeUpdate/:id',[ body('employeeCode').isLength({ min: 4, max:4 }) ], (req, res) => {
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
                res.status(200).json(result);
            })
            
        }
        
    })

//pagination employee
app.get('/employeeListPagination/:page', async(req, res, next)=> {
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
                        // res.render('employee', {
                        //     employee: products,
                        //     departmen:result,
                        //     current: page,
                        //     pages: Math.ceil(count / perPage)
                        // })
                        // res.status(200).json(products);
                        res.status(200).json({
                            "from": ((perPage*page)-perPage)+1,
                            "to": perPage*page,
                            "perPage": "5",
                            "currentPage": page,
                            "lastPage": Math.ceil(count / perPage),
                            "total": count,
                            "Content": products
                        });
                    })
                })
            } 
        });
   
})
//search employee with department name
app.get('/employee/searchEmployee/:text/:filterDept', async(req, res, next)=>{
    var perPage = 5;
    var page= 1;
    var dept= req.params.filterDept;
    if(page=="1"){
         page =  1
    }
    else{
        
    }
    // var from=page*perPage-(perPage-1);
    // var to= page*perPage;
    var text= req.params.text;
    // console.log(text);
    await employee.find({ $or: [ { empName: text}, { department: dept } ] }, (err, result) => {
        if(err) {
            res.status(200).json({error: err});
        } else {
           
        } 
    }).sort( { empName : 1} ).skip((perPage * page) - perPage)
    .limit(perPage).exec(function(err, products) {
        employee.count().exec(function(err, count) {
            if (err) return next(err)
            // res.render('searchEmployee', { 
            //     employee: products,
            //     from:from,
            //     to:to,
            //     current: page,
            //     pages: Math.ceil(count / perPage),
            //     Text: text,
            //     filterDept:dept
            // })
            res.status(200).json({"result": products})
        })
    });
})

module.exports=app