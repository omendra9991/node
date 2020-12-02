const mongoose = require('mongoose');
 
var departmentSchema = new mongoose.Schema({
deptName: {
type: String,
required: 'This field is required!',
unique : true
},
deptCode: {
type: String,
unique : true
},

details: {
type: String
}
});
 
mongoose.model('Department', departmentSchema);