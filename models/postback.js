var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostbackSchema = new Schema({
    id : {
        type: String,
        required: true,
        unique: true,
    },
    received:{
        type: String,
        required: true,

    },
    response: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Postback', PostbackSchema);