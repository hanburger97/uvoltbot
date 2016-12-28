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
            if (!sendGenericMessage(event.sender.id, event.message.text)) {
                sendMessage(event.sender.id, {text: "Echo: " + event.message.text})

            }
        }
        res.sendStatus(200);
    }
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

function sendGenericMessage(sender, text) {
    //Generic template
    if (text === 'Shop'){
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
        sendMessage(sender, message);
        return true;
    }
    //Button template
    else if(text ==='Menu'){
        message = {
            "attachment":{
                "type":"template",
                "payload":{
                    "template_type":"button",
                    "text":"What do you want to do next?",
                    "buttons":[
                        {
                            "type":"web_url",
                            "url":"https://hanxstandard.com",
                            "title":"Show Website"
                        },
                        {
                            "type":"postback",
                            "title":"Start Chatting",
                            "payload":"USER_DEFINED_PAYLOAD"
                        }
                    ]
                }
            }
        };
        sendMessage(sender, message);
        return true
    }
    else if (text ==='List'){
        message = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "list",
                    "elements": [
                        {
                            "title": "Classic T-Shirt Collection",
                            "image_url": "https://peterssendreceiveapp.ngrok.io/img/collection.png",
                            "subtitle": "See all our colors",
                            "default_action": {
                                "type": "web_url",
                                "url": "https://peterssendreceiveapp.ngrok.io/shop_collection",
                                "messenger_extensions": true,
                                "webview_height_ratio": "tall",
                                "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                            },
                            "buttons": [
                                {
                                    "title": "View",
                                    "type": "web_url",
                                    "url": "https://peterssendreceiveapp.ngrok.io/collection",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                }
                            ]
                        },
                        {
                            "title": "Classic White T-Shirt",
                            "image_url": "https://peterssendreceiveapp.ngrok.io/img/white-t-shirt.png",
                            "subtitle": "100% Cotton, 200% Comfortable",
                            "default_action": {
                                "type": "web_url",
                                "url": "https://peterssendreceiveapp.ngrok.io/view?item=100",
                                "messenger_extensions": true,
                                "webview_height_ratio": "tall",
                                "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                            },
                            "buttons": [
                                {
                                    "title": "Shop Now",
                                    "type": "web_url",
                                    "url": "https://peterssendreceiveapp.ngrok.io/shop?item=100",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                }
                            ]
                        },
                        {
                            "title": "Classic Blue T-Shirt",
                            "image_url": "https://peterssendreceiveapp.ngrok.io/img/blue-t-shirt.png",
                            "subtitle": "100% Cotton, 200% Comfortable",
                            "default_action": {
                                "type": "web_url",
                                "url": "https://peterssendreceiveapp.ngrok.io/view?item=101",
                                "messenger_extensions": true,
                                "webview_height_ratio": "tall",
                                "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                            },
                            "buttons": [
                                {
                                    "title": "Shop Now",
                                    "type": "web_url",
                                    "url": "https://peterssendreceiveapp.ngrok.io/shop?item=101",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                }
                            ]
                        },
                        {
                            "title": "Classic Black T-Shirt",
                            "image_url": "https://peterssendreceiveapp.ngrok.io/img/black-t-shirt.png",
                            "subtitle": "100% Cotton, 200% Comfortable",
                            "default_action": {
                                "type": "web_url",
                                "url": "https://peterssendreceiveapp.ngrok.io/view?item=102",
                                "messenger_extensions": true,
                                "webview_height_ratio": "tall",
                                "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                            },
                            "buttons": [
                                {
                                    "title": "Shop Now",
                                    "type": "web_url",
                                    "url": "https://peterssendreceiveapp.ngrok.io/shop?item=102",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                }
                            ]
                        }
                    ],
                    "buttons": [
                        {
                            "title": "View More",
                            "type": "postback",
                            "payload": "payload"
                        }
                    ]
                }
            }
        };
        sendMessage(sender, message);
        return true
    }
    else{
        return false
    }

};