var mysql = require['mysql'];


//buat koneksi
const con = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'dbrestapi'
});

con.connect((err)=>{
  if(err) throw err;
  console.log('Mysql terkoneksi');  
})

module.exports = con;