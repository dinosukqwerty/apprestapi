'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req, res){
    response.ok("Aplikasi RestAPI berjalan",res)
};

//menampilan semua data mahasiswa
exports.tampilsemua = function(req, res){
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fileds){
        if(error){
            connection.log(error);
        }else {
            response.ok(rows, res)
        }
    });
};

//menampilkan data mahasiswa berdasarkan id
exports.tampilid = function(req, res){
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa=?', [id], function(error, row, fileds){
        if(error){
            connection.log(error);
        }else{
            response.ok(row, res)
        }
    }) 
}