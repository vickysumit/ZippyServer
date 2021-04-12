var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ActiveDish = new Schema({
    itemname: {
        type: String,
        require:true
    },
    category:{
        type: String,
        require:true
    },
    active:{
        type:Boolean,
        default: false
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Activedish',ActiveDish);