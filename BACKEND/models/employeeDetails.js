const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    nic : {
        type : String,
        required: true
    },
    name : {
        type : String,
        required: true
    },
    gender : {
        type : String,
        required: true
    },
    age : {
        type : Number,
        required: true
    },
    position : {
        type : String,
        required: true
    },
    address : {
        type : String,
        required: true
    },
    mobile : {
        type : Number,
        required: true
    },
    username : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    }

})

const Employee = mongoose.model("Employee",employeeSchema);

module.exports = Employee;