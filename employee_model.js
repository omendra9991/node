const mongoose = require('mongoose');
 
//Attributes of the Course object
var employeeSchema = new mongoose.Schema({
empName: {
type: String,
required: 'This field is required!'
},
employeeCode: {
type: String
},
department: {
type: String,
unique: false
},
DOJ: {
type: String
}
});
 
mongoose.model('Employee', employeeSchema);