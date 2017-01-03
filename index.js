var express = require('express');
var bodyParser = require('body-parser');

//var request = require('request');

require('./lib/connection');
var testdb = require('./routes/testdb');
var app = express();
var webhook = require('./routes/webhook');
var responses = require('./routes/responses');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 3000));

//app.use(testdb);
// Server frontpage

app.get('/', function (req, res) {
    res.send('This is TestBot Server');
});
app.use(webhook);
app.use(responses);
