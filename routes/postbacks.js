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
router.post('/postbacks', function (req, res, next) {
    var newData = {
        id: Math.random(),
        received: req.body.received,
        response: req.body.response,
        action: req.body.action
    };
    var postback = new Postback(newData);
    postback.save(function (err, data) {
        if (err){
            return next(err)
        }
        res.json(data)
    });


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
    Postback.findOneAndUpdate({id: req.params.id}, {
        received: req.body.received,
        response: req.body.response,
        action:req.body.action
    }, function (err, data) {
        if (err){
            next(data)
        }
        res.json(data)

    });

});
router.delete('/postbacks/:id', function (req, res, next) {
    Postback.remove({
        id: req.params.id
    }).exec(function (err) {
        if (err){
            return next(err)

        }
        res.sendStatus(200)
    });
});
module.exports = router;
