var express = require('express');
var router = express.Router();
var log = require('../lib/log.js').logger('index.js');
var conf = require('../conf');
/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;
