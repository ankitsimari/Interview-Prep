const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    title:String,
    answer:String,
    email:String,
    topic:String,
    name:String
},{
    versionKey:false
})

const questionModel = mongoose.model('question',questionSchema);

module.exports={questionModel}