var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ResponseSchema = new Schema({
    id : {
        type: String,
        required: true,
        unique: true
    },
    trigger : {
        type: String,
        required: true,
    },
    response : {
        type: String,
        required: true,

    }
});
module.exports = mongoose.model('Response', ResponseSchema);
