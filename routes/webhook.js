var express = require('express');
var router = express.Router();
var logic = require('../models/logic');
var mongoose = require('mongoose');
var Response = mongoose.model('Response');
var Postback = mongoose.model('Postback');

router.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'testbot_verify_token') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});
router.post('/webhook', function (req, res) {
    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {

            event.message.text = event.message.text.toLowerCase();
            var words = event.message.text.split(' ');
            //console.log(words);

            for(z =0; z < words.length; z ++) {
                no_reply = false;
                var word = words[z];
                Response.findOne({
                    trigger: word
                }).exec(function (err, data){
                    if (err){
                        console.log(err);
                    }

                    else if (!data) {
                        console.log('No data');
                        no_reply = true;
                    }
                    else {
                        logic.sendMessage(event.sender.id, data.response);
                        no_reply = false;
                        
                    }
                });

            };
            if (z + 1 == words.length && no_reply){
                logic.sendMessage(event.sender.id, {
                    text: "Sorry, I am not programmed to understand this yet",
                    //text: "Sorry " + currentUser.first_name + ", I am not programmed to understand this yet",
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "Ok",
                            payload: "undefined"
                        },
                        {
                            content_type: "text",
                            title: 'Nevermind',
                            payload: "start"
                        }
                    ]
                });
            }

        } else if (event.postback){

            Postback.findOne({
                received: event.postback.payload
            }).exec(function (err, data) {
                if (err){
                    console.log(err)
                }else if (!data){
                    logic.sendMessage(event.sender.id, {text:"Sorry I am not programmed to handle this button yet"});
                }else{
                    logic.sendMessage(event.sender.id, data.response);
                }
            });
        }
    }
    res.sendStatus(200);
});

module.exports = router;