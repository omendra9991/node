const mongoose = require('mongoose');
 
var localUserSchema = new mongoose.Schema({
userName: {
type: String,
required: 'This field is required!',
unique:true
},
password: {
type: String,

}

});
localUserSchema.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};
 
mongoose.model('localUser', localUserSchema);