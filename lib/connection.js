var mongoose = require('mongoose');
var dbUrl = 'mongodb://mongodb://root:root@ds149278.mlab.com:49278/heroku_sn31b5k0';
//var dbUrl = process.env.DB_ROOT;
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, function (err){
    if (err) {
        return console.log('there was a problem connecting to the database!' + err);
    }
    console.log('connected!');

});
// Close the Mongoose connection on Control+C
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected');
        process.exit(0);
    });
});
require('../models/response');