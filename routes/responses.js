var express = require('express');
var mongoose = require('mongoose');
var Response = mongoose.model('Response');
var router = express.Router();

router.get('/responses', function (req, res, next) {
    Response.find().sort('trigger').exec(function (error, results){
        if (error){
            return next(error);
        }
        res.json(results);

    })
});

router.post('/responses', function(req, res, next){
    var newData = {
        id: Math.random(),
        trigger: req.body.trigger,
        response: req.body.response,
        action: req.body.action
    };
    var response = new Response(newData);
    response.save(function (err, data) {
        if (err) {
            return next(err);
        }
        res.json(data)
    });

});

router.get('/responses/:id', function (req, res){
    Response.findOne({ id: req.params.id}).exec(function (error, result){
        if (error){
            return next(error)
        }else if (!result){
            res.sendStatus(404);
        }else{
            res.json(result);

        }


    })
});
router.put('/responses/:id', function (req, res, next) {
    delete req.body._id;
    Response.findOneAndUpdate({id: req.params.id}, {
        trigger: req.body.trigger,
        response: req.body.response,
        action: req.body.action
    }, function (err, data) {
        if (err){
            next(data)
        }
        res.json(data)

    });
    /*
    Response.save({
        id: req.params.id
    }, function(error, data){
        if (error){
            return next(error)
        }
        res.json(data)
    });*/

});
router.delete('/responses/:id', function (req, res, next) {


    Response.remove({
        id: req.params.id
    }).exec(function (error) {
        if (error) {
            return next(error)
        }
        res.sendStatus(200);
    })
});
module.exports = router;