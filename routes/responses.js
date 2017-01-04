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
    var genId = Math.random();
    Response.create([{
        id: genId,
        trigger: req.body.trigger,
        response: req.body.response
        }], function (error) {
            if (error){
                return next(error)
            }
            Response.find().sort('trigger').exec(function (error, results){
                if (error){
                    return next(error);
                }
                res.json(results);

            })
        }
    )
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
    Response.update({
        id: req.params.id
    }, req.body, function(error){
        if (error){
            return next(error)
        }
        res.sendStatus(200)
    });

});
router.delete('/responses/:id', function (req, res, next) {
    Response.remove({
        id: req.params.id
    }).exec(function (error) {
        if (error) {
            return next(error)
        }
        res.sendStatus(200)
    })
});
module.exports = router;