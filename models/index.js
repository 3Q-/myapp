var mongoose = require('mongoose');
var config = require('../conf');

mongoose.connect(config.dbUrl, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.dbUrl, err.message);
    process.exit(1);
  }
});

// models
require('./user');
exports.User = mongoose.model('User');
