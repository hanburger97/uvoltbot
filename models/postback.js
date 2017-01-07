var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostbackSchema = new Schema({
    id : {
        type: String,
        required: true,
        unique: true
    },
    received:{
        type: String,
        required: true

    },
    response: {
        type: Object,
        required: true
    },
    action: {
        type: String,
        required: false
    }
});
module.exports = mongoose.model('Postback', PostbackSchema);