var express = require('express');
var router = express.Router();
var log = require('../lib/log.js').logger('index.js');
var uutil = require('../lib/uutil');
var render = uutil.render;
/* GET home page. */
router.get('/', function(req, res) {
    var obj = {title:'Admin'};
    render(req, res, 'index', obj);
});
module.exports = router;
