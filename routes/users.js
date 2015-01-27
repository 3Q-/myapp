var express = require('express');
var router = express.Router();
var uutil = require('../lib/uutil');
var render = uutil.render;
var log = require('../lib/log.js').logger('users.js');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
}).get('/login', function(req, res) {
    res.redirect('/');
  //res.end('respond with a resource');
})
.post('/login', function(req, res) {
})
.get('/register', function(req, res){
    log.info('访问注册');
    render(req, res, 'register',{title:'Register'});
});

module.exports = router;
