'use strict';

exports.ok = function(values, res){
    // var data = {
    //     'data' : 200,
    //     'values': values
    // }
    //  res.json(data);
    //  res.end();

    var data = values
     res.json(data);
    res.end();
}

//NESTED untuk matakuliah 
exports.oknested = function(values, res){
    //mengakumulasikan
        const hasil = values.reduce((akumulasikan, item)=>{
            //tentukan key groupnya
            if(akumulasikan[item.nama]){
                //buat variable group mahasiswa
                const gruop = akumulasikan[item.nama];
                //cek jika array adalah matakuliah
                if(Array.isArray[gruop.matakuliah]){
                    //tambahkan value ke dalam goup matakuliah
                    gruop.matakuliah.push[item.matakuliah];
                }else{
                    gruop.matakuliah = [gruop.matakuliah, item.matakuliah];
                }
            }else {
                akumulasikan[item.nama] = item;
            }
            return akumulasikan;
        },{});

        // var data = {
        //     'data' : 200,
        //     'values': hasil
        // };

        // res.json(data);
        // res.end();
       
        var data = {
            'values': hasil
        };
        
        res.json(data);
        res.end();
    }