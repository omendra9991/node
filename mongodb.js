const mongoose = require('mongoose');
 
mongoose.connect('mongodb+srv://omendra:omendra@cluster0.zynjw.mongodb.net/test', {useNewUrlParser: true}, (err) => {
if (!err) {
console.log('Successfully Established Connection with MongoDB')
}
else {
console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
}
});
 
//Connecting Node and MongoDB
require('./course.model');