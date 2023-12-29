const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb+srv://ankitsimari:ankit123@cluster0.qb2hai2.mongodb.net/Int-Ques?retryWrites=true&w=majority');

module.exports={connection}