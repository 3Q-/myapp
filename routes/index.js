var express = require('express');
var router = express.Router();
var log = require('../lib/log.js').logger('index.js');
var conf = require('../conf');
var uutil = require('../lib/uutil');
var render = uutil.render;
/* GET home page. */

router.get('/', function(req, res) {
    log.info('访问了www.xiexie.com');
    var obj = {title:'Express'};
    render(req, res, 'index', obj);
});

module.exports = router;
