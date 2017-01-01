
var request = require('request');

var headers ={
    'Content-Type': 'application/json'
}
var options = {
    url: 'https://graph.facebook.com/v2.6/me/thread_settings?access_token=EAARuSXc4aNsBANaHaklSXGazOrnzC82dxEyT4ZA3AtKNcVo5fE1qHWcXQlAWia4s1bBIbj9V6uMVttACXM5aPnFFVPBTjH0Pdv4mg09f2z2Mwpmi8hyjmTbNpl8EfhgmLsSzCZCuTiueaFb9K6ygiF4AkQyXebhYsxZAZClnowZDZD',
    method : 'POST',
    headers: headers,
    form : {
        "setting_type" :"call_to_actions",
        "thread_state" :"new_thread",
        "call_to_actions":[
            {
                "payload":"start"
            }
        ]
    }

}
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {

        console.log(body)
    }
})