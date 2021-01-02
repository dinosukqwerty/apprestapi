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
}