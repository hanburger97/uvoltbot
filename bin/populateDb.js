var async = require('async');
var mongoose = require('mongoose');
require(process.cwd() +'/lib/connection');
var Response = mongoose.model('Response');
var data = {
    responses: [
        {
            id: '1',
            trigger: 'hello',
            response: 'hello'
        },
        {
            id: '1',
            trigger: 't1',
            response: 'r1'
        },
        {
            id: '1',
            trigger: 't2',
            response: 'r2'
        },

    ]
};
var deleteResponse = function (callback){
    console.info('deleting previous set responses');
    Response.remove({}, function(error, response){
        if (error){
            console.log('There was an error deleting previous responses ; '+ error);
        };
        console.log('Done');
        callback();
    });
};
var addResponses = function(callback) {
    console.info('Adding responses');
    Response.create(data.responses, function (error) {
        if (error) {
            console.error('Error: ' + error);
        }
        console.info('Done');
        callback();
    });
};
async.series([
    deleteResponse,
    addResponses
], function(error, results) {
    if (error) {
        console.error('Error: ' + error);
    }
    mongoose.connection.close();
    console.log('Done!');
});