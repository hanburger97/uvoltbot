var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 3000));

// Server frontpage
app.get('/', function (req, res) {
    res.send('This is TestBot Server');
});

// Facebook Webhook
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'testbot_verify_token') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});

// handler receiving messages
app.post('/webhook', function (req, res) {
    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
            if (event.message && event.message.text) {
                if (!shop(event.sender.id, event.message.text)) {
                    sendMessage(event.sender.id, {text: "Echo: " + event.message.text});
                }
            }
        }
    }
    res.sendStatus(200);
});


function sendMessage(recipientId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: recipientId},
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};

function kittenMessage(recipientId, text) {

    text = text || "";
    var values = text.split(' ');

    if (values.length === 3 && values[0] === 'kitten') {
        if (Number(values[1]) > 0 && Number(values[2]) > 0) {

            var imageUrl = "https://placekitten.com/" + Number(values[1]) + "/" + Number(values[2]);

            message = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "Kitten",
                            "subtitle": "Cute kitten picture",
                            "image_url": imageUrl ,
                            "buttons": [{
                                "type": "web_url",
                                "url": imageUrl,
                                "title": "Show kitten"
                            }, {
                                "type": "postback",
                                "title": "I like this",
                                "payload": "User " + recipientId + " likes kitten " + imageUrl,
                            }]
                        }]
                    }
                }
            };

            sendMessage(recipientId, message);

            return true;
        }
    }

    return false;

};

function shop(recipientId, text) {


    if (text === 'Shop') {

        message = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "First card",
                        "subtitle": "Element #1 of an hscroll",
                        "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                        "buttons": [{
                            "type": "web_url",
                            "url": "https://www.messenger.com",
                            "title": "web url"
                        }, {
                            "type": "postback",
                            "title": "Postback",
                            "payload": "Payload for first element in a generic bubble",
                        }],
                    }, {
                        "title": "Second card",
                        "subtitle": "Element #2 of an hscroll",
                        "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                        "buttons": [{
                            "type": "postback",
                            "title": "Postback",
                            "payload": "Payload for second element in a generic bubble",
                        }],
                    }]
                }
            }
        };
        sendMessage(recipientId, message);
        return true;

    }

    return false;

};
