const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:Number,
    },
    date:{
        type:Date,
    },
    comments:{
        type:String,
    },

})

//now we need to create a collection

const Register = new mongoose.model("Register", bookingSchema);

module.exports = Register;