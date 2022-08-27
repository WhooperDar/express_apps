const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
 
const loginRestoSchema = new Schema({
    name: {
        type: String, 
        required: true
    }, 
    email: { 
        type: String, 
        required: true
    }, 
    password: {
        type: String, 
        required: true
    }
}, { timestamps: true }); 

const LoginResto = mongoose.model('user_resto', loginRestoSchema); 

module.exports = LoginResto; 