var express = require('express');
var router = express.Router();
var uutil = require('../lib/uutil');
var render = uutil.render;
var log = require('../lib/log.js').logger('login.js');

/* GET users listing. */
router
.get('/', function(req, res) {
    log.info('访问了Login');
    render(req, res, 'login',{title:'Login'});
})
.post('/', function(req, res){
    res.end({title:'en'});
});
module.exports = router;
