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
         username: req.body.username,
         email: req.body.email,
         password: md5(req.body.password),
         role: req.body.role,
         tanggal_daftar: new Date(),
     } 

     var query = "SELECT email FROM ?? WHERE ??=? "; //select email
     var table= ["user", "email", post.email]; // from table user dimana emailnya adalah email, (email ngecek sudah terdaftar belum)

    query = mysql.format(query, table);

    connecion.query(query, function(error, rows){
        if (error) {
            console.log(error);
        }else{
            if(rows.length == 0 ){
            var query = "INSERT INTO ?? SET ?";
            var table = ["user"];
            query = mysql.format(query, table);
            connecion.query(query, post, function(error, rows){
                if(error){
                    console.log(error);
                }else{
                    response.ok("berhasil menambahkan data user baru", res);
                }
            });

            }else{
                response.ok ("email sudah terdaftar", res);          
            }
        }
    });
    
 }

//controller untuk login
exports.login = function(req,res){
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["user", "password", md5(post.password), "email", post.email];

    query = mysql.format(query,table);
    
    connecion.query(query, function(error, rows){
        if (error) {
            console.log(error);
        }else{
            if (rows.length == 1){
                var token = jwt.sign({rows}, config.rahasia, {
                    expiresIn : 1440
                });

                id_user = rows[0].id;
                
                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"];

                query = mysql.format(query, table)
                connecion.query(query, data, function(error, rows){
                    if (error){
                        console.log(error)
                    }else{
                         res.json({
                             success: true,
                             message: 'token JWT berhasil tergenerate',
                             token:token,
                             currUser: data.id_user
                         });
                    }
                });
            }else {
                 res.json({"error": true, "Message":"Email atau Password Salah"});
            }
        }
    });
}

// // controller untuk login
// exports.login = function (req, res) {
//     var post = {
//          password: req.body.password,
//          email: req.body.email
//     }

//     var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
//     var table = ["user", "password", md5(post.password), "email", post.email];

//     query = mysql.format(query, table);

//     connection.query(query, function (error, rows) {
//          if (error) {
//               console.log(error);
//          } else {
//               if (rows.length == 1) {
//                    var token = jwt.sign({ rows }, config.rahasia, {
//                         //ubah expires dalam ms
//                         expiresIn: '2400000'
//                    });

//                    id_user = rows[0].id;
//                    //1 tambahan row username
//                    username = rows[0].username;
//                    //2 tambahan row role
//                    role = rows[0].role;

//                    //3 variable expires
//                    // var expired = 30000
//                    var expired = 2400000
//                    var isVerified = rows[0].isVerified

//                    var data = {
//                         id_user: id_user,
//                         access_token: token,
//                         ip_address: ip.address()
//                    }

//                    var query = "INSERT INTO ?? SET ?";
//                    var table = ["akses_token"];

//                    query = mysql.format(query, table);
//                    connection.query(query, data, function (error, rows) {
//                         if (error) {
//                              console.log(error);
//                         } else {
//                              res.json({
//                                   success: true,
//                                   message: 'Token JWT tergenerate!',
//                                   token: token,
//                                   //4 tambahkan expired time
//                                   expires: expired,
//                                   currUser: data.id_user,
//                                   user: username,
//                                   //3 tambahkan role
//                                   role: role,
//                                   isVerified: isVerified
//                              });
//                         }
//                    });
//               }
//               else {
//                    res.json({ "Error": true, "Message": "Email atau password salah!" });
//               }
//          }
//     });
// }