const mongoose = require('mongoose');
const { Schema } = mongoose;


const quote = mongoose.Schema({
    quoteName :  { type : String , default : ''},
    authorName :   { type : String , default : '' },
    createdDate :  { type: Date, default: Date.now },
    updateDate :  { type: Date, default: Date.now }
});

module.exports = mongoose.model('quote', quote);