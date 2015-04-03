var bcrypt = require('bcrypt');

exports.bhash = function (str, fn) {
    bcrypt.genSalt(12, function(err, salt){
        if(err){
            fn(err); 
            return;
        }
        bcrypt.hash(str, salt, function(err, hash){
            if(err){
                fn(err); 
                return;
            }
            fn(null, salt, hash);
        });
    });
};

exports.bcompare = function (str, salt, fn) {
    bcrypt.hash(str, salt, function(err, hash){
        if(err){
            fn(err); 
            return;
        }
        fn(null, hash);
    });
};
