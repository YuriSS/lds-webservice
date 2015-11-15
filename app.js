var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var config     = require('./config');
var app        = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


require('./app/dataBaseHandler')(mongoose, config);
require('./app/core')(express, app, mongoose, config);


var server = app.listen(config.port, function() {
    console.log(server.address());
});