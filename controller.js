'use strict';

var response = require('./res');
var connnection = require('./koneksi');

exports.index = function(req, res){
    response.ok("Aplikasi RestAPI berjalan")
};