var mongoose = require('mongoose');
var Response = mongoose.model("Response");

function getResponse(req){
    Response.findOne({
        trigger: req
    }).exec(function(error, result){
        if(error){
            return console.log(error);
        }
        //return res.end(result.response);
        module.exports.response = result.response;
        console.log(result.response)
    })

};

module.exports.getResponse = getResponse;