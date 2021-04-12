var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VendorList = new Schema({
    name:{
        type:String,
        require:true
    },
    time:{
        type: String,
        require:true
    },
    overview:{
        type: String,
        require:true
    },
    menu:[
        {
            itemname:String,
            price: Number,
            itemimage:String
        },
        {
            itemname:String,
            price:Number,
            itemimage:String
        },
        
    ],
    image:{
        type:String,
        require:true
    }
    
},{
    timestamps:true
});

module.exports = mongoose.model('VendorList',VendorList);