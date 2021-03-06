var express = require('express');
var router = express.Router();
var logic = require('../models/logic');
var mongoose = require('mongoose');
var Response = mongoose.model('Response');
var Postback = mongoose.model('Postback');
var async = require('async');

var pausedUsers = [];

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
    /*** TIMEOUT SECTION **/
    if (pausedUsers[event.sender.id] && pausedUsers[event.sender.id] > new Date()) {
      // skiped
      //logic.sendMessage(event.sender.id, {text: "DEBUG: PAUSED until " + pausedUsers[event.sender.id].toString()});
        event.message.text = '';
      break
    } else {
      // Expired. Remove pause
      delete pausedUsers[event.sender.id]
    }

    if (event.message && event.message.text) {
      event.message.text = event.message.text.toLowerCase();
      var words = event.message.text.split(' ');
      var words2 = event.message.text.split(' ');
      //console.log(words);


      var f1 = function (callback) {
        var r = [];
        for (z = 0; z < words.length; z++) {
          var word = words[z];
          Response.findOne({
            trigger: word
          }).exec(function (err, data) {
            if (err) {
              console.log(err);
            }

            else if (!data) {
              console.log('No data');
              r.push('a');
              console.log("r is " + r);
              console.log('words2 is ' + words2);
              if (r.length == words2.length) {
                console.log("NO REPLY");
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
            }
            else {
              //var jsonData = JSON.parse(data.response);
              if (data.action && data.action.operation == 'Timeout') {
                var until = new Date(new Date().getTime() + (data.action.value * 1000));
                pausedUsers[event.sender.id] = until
              }
              logic.sendMessage(event.sender.id, data.response);


            }
          });
        }
        console.log('f1 executed');
        console.log(r);
        callback();
      };

      async.series([
        f1
      ], function (error) {
        if (error) {
          console.log(error)
        }
        console.log('executed f1, f2')
      });

    } else if (event.postback) {

          Postback.findOne({
              received: event.postback.payload
          }).exec(function (err, data) {
              if (err) {
                  console.log(err)
              } else if (!data) {
                  logic.sendMessage(event.sender.id, {text: "Sorry I am not programmed to handle this button yet"});
              } else {
                  if (data.action && data.action.operation == 'Timeout') {
                      var until = new Date(new Date().getTime() + (data.action.value * 1000));
                      pausedUsers[event.sender.id] = until
                  }
                  logic.sendMessage(event.sender.id, data.response);
              }
          });
      }
  }
  res.sendStatus(200);
});

module.exports = router;