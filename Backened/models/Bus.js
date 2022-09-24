const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Schema for user
const BusSchema = new Schema({
    bus_no:
    {
        type:Number,
        required:true
    },
    path:
    {
        type:Array,
        require:true
    }
    ,start_time:{
        type:Date
    }
    ,
    available_seats:{
        type:Number,
        min:0
    }
});

// creating Blog model with collection name blogs
const Bus = mongoose.model('bus', BusSchema);

module.exports = Bus;