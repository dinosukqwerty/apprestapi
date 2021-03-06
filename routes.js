'use strict';

const { json } = require('body-parser');

module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/')
    .get(jsonku.index);

    app.route('/tampil')
    .get(jsonku.tampilsemua);

    app.route('/tampil/:id')
    .get(jsonku.tampilid);

    app.route('/tambah')
    .post(jsonku.tambahMahasiswa);

    app.route('/ubah')
    .put(jsonku.ubahMahasiswa);
    
    app.route('/hapus')
    .delete(jsonku.hapusMahasiswa);

    app.route('/tampilneste')
    .get(jsonku.tampilgroupmakul);
}