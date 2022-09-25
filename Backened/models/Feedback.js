const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Schema for user
const FeedbackSchema = new Schema({
    mobile:{
        type:String,
        required:true,
        maxLength:10
    },
    message:
    {
        type: String,
        required: true
    },
});

// creating Blog model with collection name blogs
const User = mongoose.model('feedback', FeedbackSchema);

module.exports = User;