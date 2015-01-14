var mongoose = require('mongoose');

exports.connect = function(req, res){
    mongoose.connect('mongodb://localhost/app6', function(e){
        console.log(e);
        if(e) res.send(e.message);
        res.send('connect yes!!!!!!');
    });
};
