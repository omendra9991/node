const mongoose = require('mongoose');
 
var departmentSchema = new mongoose.Schema({
deptName: {
type: String,
required: 'This field is required!'
},
deptCode: {
type: String
},

details: {
type: String
}
});
 
mongoose.model('Department', departmentSchema);