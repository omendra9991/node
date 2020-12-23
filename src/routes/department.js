var express = require('express');
var app = express();
const bodyParser= require('body-parser')
const mongoose = require('mongoose');
let alert = require('alert');  
const { body, validationResult } = require('express-validator');

app.use(bodyParser.urlencoded({ extended: true }))
const department = mongoose.model('Department');
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
    // res.sendFile(__dirname + "/public/index.html");
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
                    // res.render('department', {
                    //     department: products,
                    //     from:from,
                    //     to:to,
                    //     current: page,
                    //     pages: Math.ceil(count / perPage)
                    // })
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
})
//search department
app.get('/depart/searchDepartment/:text', async(req, res, next)=>{
    // let deptName = document.getElementById("searchingText").value;
    var text= req.params.text;
    console.log(text);
    await department.find({"deptName": text}, (err, result) => {
        if(err) {
            res.status(200).json({error: err});
        } else {
            // res.status(200).json(result);
            // res.render('department', {
            //     department: result,
            //     current: 1,
            //     pages: 1
            // })
            res.status(200).json({result})
        } 
    }).sort( { deptName : 1} );
})

module.exports=app