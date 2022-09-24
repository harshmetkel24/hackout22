const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const BusStopSchema = new Schema({
     name:{
        type:String,
        required:true
     },
     id:{
        type:Number,
        required:true
     }
     ,
     Passengers:{
        type:Number,
        required:true
     }
     ,
     bus_list:{
        type:Array
     }
});

// creating Blog model with collection name blogs
const BusStop = mongoose.model('busStop', BusStopSchema);

module.exports = BusStop;