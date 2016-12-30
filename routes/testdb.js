var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var getResponseModule = require ('../models/getResponse');
var Response = mongoose.model('Response');

router.get('/testdb/:trigger', function (req, res) {
    /*
    Response.findOne({
        trigger: req.params.trigger
    }).exec(function(error, result){
        if(error){
            return next(error);
        }
        return res.end(result.response);

    })*/
    //getResponseModule.getResponse(req.params.trigger);

    //res.end(getResponseModule.getResponse(req.params.trigger, next));
    //getResponseModule.getResponse(req,res,next)
});

module.exports = router