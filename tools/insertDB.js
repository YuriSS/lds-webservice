var fs = require('fs');
var path = require('path');
var request = require('request');

var config = {
    path: teste.txt,
};

function insert() {}

fs.readFile(config.path, 'utf-8', function(err, file) {

    if(err) {
        return console.error('Error: ', file);
    }

    console.log(file);

});
