const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const salarySchema = new Schema({
    nic : {
        type : String,
        required: true
    },
    position : {
        type : String,
        required: true
    },
    name : {
        type : String,
        required: true
    },
    dailywage : {
        type : Number,
        required: true

    },
    days : {
        type : Number,
        required: true

    },
    leaves : {
        type : Number,
        required: true

    },
    salary : {
        type : Number,
        required: true

    }
    

})

const Salary = mongoose.model("Salary",salarySchema);

module.exports = Salary;