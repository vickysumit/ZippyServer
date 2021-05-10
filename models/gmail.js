const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const gmailSchema = new Schema({
    gmailname:{
        type: String,
        required: true,
    }
},
{
    timestamps:true
})

var Gmails = mongoose.model('Gmail',gmailSchema);

module.exports = Gmails;