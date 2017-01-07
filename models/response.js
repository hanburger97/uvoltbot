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
        type: Object,
        required: true,

    },
    action: {
        type: String,
        required: false
    }
});
module.exports = mongoose.model('Response', ResponseSchema);
