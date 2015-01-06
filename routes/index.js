var express = require('express');
var router = express.Router();
//var logger = require('../lib/log4js').logger('index.js');

/* GET home page. */
router.get('/', function(req, res) {
    res.cookie('haha','name1=value1&name2=value2');
  res.render('index', { title: 'Express' });
});

module.exports = router;
