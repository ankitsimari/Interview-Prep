const mongoose = require('mongoose');

const openSourceQuestionSchema = mongoose.Schema({
    title:String,
    answer:String,
    email:String,
    name:String,
    status:String,
    topic:String
},{
    versionKey:false
})


const openSourceQuestionModel = mongoose.model("openSource",openSourceQuestionSchema);

module.exports={openSourceQuestionModel}