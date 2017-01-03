var express = require('express');
var mongoose = require('mongoose');
var Postback = mongoose.model('Postback');
var router = express.Router();

router.get('/postbacks', function (req, res, next) {
    Postback.find().sort('received').exec(function (error, results){
        if (error){
            return next(error);
        }
        res.json(results);
    })
});
router.get('/postbacks/:id', function (req, res){
    Postback.findOne({ id: req.params.id}).exec(function (error, result){
        if (error){
            return next(error)
        }else if (!result){
            res.send(404);
        }else{
            res.json(result);
        }


    })
});
router.put('/postbacks/:id', function (req, res, next) {
    delete req.body._id;
    Postback.update({
        id: req.params.id
    }, req.body, function(error){
        if (error){
            return next(error)
        }
        res.send(200)
    });

});
module.exports = router;
