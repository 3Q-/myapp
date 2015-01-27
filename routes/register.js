var express = require('express');
var router = express.Router();
var uutil = require('../lib/uutil');
var render = uutil.render;
var log = require('../lib/log.js').logger('users.js');
var redis = require('redis');
var bcrypt = require('bcrypt');
var rdb = redis.createClient();

/* GET users listing. */
router
.get('/', function(req, res) {
    log.info('访问注册');
    render(req, res, 'register',{title:'Register'});
})
.post('/', function(req, res){
    log.info('访问注册');
    render(req, res, 'register',{title:'Register'});
});

module.exports = router;
