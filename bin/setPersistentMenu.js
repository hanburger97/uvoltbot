/*This is not fucking working, idk why, the other module for the same post request work just fine
honestly wtf*/

var request = require('request');

request({
    url: "https://graph.facebook.com/v2.6/me/thread_settings?access_token=EAARuSXc4aNsBANaHaklSXGazOrnzC82dxEyT4ZA3AtKNcVo5fE1qHWcXQlAWia4s1bBIbj9V6uMVttACXM5aPnFFVPBTjH0Pdv4mg09f2z2Mwpmi8hyjmTbNpl8EfhgmLsSzCZCuTiueaFb9K6ygiF4AkQyXebhYsxZAZClnowZDZD",
    method : 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    form : {
        "setting_type" : "call_to_actions",
        "thread_state" : "existing_thread",
        "call_to_actions":[
            {
                "type":"postback",
                "title":"Help",
                "payload":"help"
            },
            {
                "type":"postback",
                "title":"Get Started",
                "payload":"start"
            },
            {
                "type":"web_url",
                "title":"Checkout",
                "url":"http://petersapparel.parseapp.com/checkout",
                "webview_height_ratio": "full",
                "messenger_extensions": true
            },
            {
                "type":"web_url",
                "title":"View Website",
                "url":"http://petersapparel.parseapp.com/"
            }
        ]
    }
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});