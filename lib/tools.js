var bcrypt = require('bcrypt');

exports.bhash = function (str, fn) {
    bcrypt.genSalt(12, function(err, salt){
        if(err) fn(err); 
        bcrypt.hash(str, salt, function(err, hash){
            if(err) fn(err);
            fn(null, salt, hash);
        });
    });
};

exports.bcompare = function (str, salt, fn) {
  bcrypt.hash(str, salt, function(err, hash){

      console.log(1, err);
      if(err) fn(err);
      fn(null, hash);
  });
};
