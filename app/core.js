var fs          = require('fs');
var path        = require('path');
var handlers    = path.join(__dirname, 'handlers');

var baseHandler = {};

/*
    * Funções de baseHandler
*/

baseHandler.handlingResponse = function(attr, callback, alternative) {
    return function(req, res) {
        var param   = baseHandler.handlingParameter(req, attr || []);
        var param_2 = baseHandler.handlingParameter(req, alternative || []);
        return callback(baseHandler.handlingError(res), param, param_2);
    }
};

baseHandler.handlingParameter = function(req, arr) {
    var result = req;
    arr.forEach(function(param) {
        result = result[param];
    });
    return result;
};

baseHandler.handlingError = function(res) {
    return function(err, data) {
        if(err) {
            return res.status(404).send(err);
        }
        return res.status(200).send(data);
    }
};

/*
    * Retorno do modulo
    ** Retorna uma função que captura todos os arquivos da pasta handlers
    ** Da um require em cada arquivo
*/

function getFiles(express, app, mongoose, config) {
    baseHandler.express  = express;
    baseHandler.app      = app;
    baseHandler.mongoose = mongoose;
    baseHandler.config   = config;

    fs.readdir(handlers, handlingError);
}

function handlingError(err, files) {
    if(err) {
        return console.error('Error: ', err);
    }
    files.forEach(eachFile);
}

function eachFile(file) {
    require(path.join(handlers, file))(baseHandler);
}

module.exports = getFiles;