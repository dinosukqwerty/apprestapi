 var connecion = require('../koneksi');
 var mysql = require('mysql');
 var md5 = require('md5');
 var response = require('../res');
 var jwt = require('jsonwebtoken');
 var config = require('../config/rahasia');
 var ip = require('ip');

 //controller untuk register
 exports.registrasi = function(req, res){
     var post = {
         username = req.body.username,
         email = req.body.email,
         password = md5(req.body.password),
         role = req.body.role,
         tanggal_daftar = new Date(),
     } 

     var query = "SELECT email FROM ??WHERE?? "; //select email
     var table= ["user", "email", post.email]; // from table user dimana emailnya adalah email, (email ngecek sudah terdaftar belum)

    query = mysql.format(query, table);
    connecion.query(query, function(error, rows, fields){
        if (error) {
            console.log(error);
        }else{
            if(rows.length == 0 ){
            query = mysql.format(query, table);
            connecion.query(query, post, function(error, rows){
                if(error){
                    console.log(error);
                }else{
                    response.ok("berhasil menambahkan data user baris", res);
                }
            });

            }else{
                response.ok ("email sudah terdaftar");          
            }
        }
    });
    
 }