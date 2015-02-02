var bcrypt = require('bcrypt');

exports.bhash = function (str, fn, next) {
    bcrypt.genSalt(12, function(err, salt, next) {
        if (err) return next(err);
        bcrypt.hash(str, salt, fn);
    });
};

exports.bcompare = function (str, hash, fn) {
  bcrypt.compare(str, hash, fn);
};
