var express = require('express');
var server = require('./server');
var sign = require('./sign');
var user = require('./user');
var admin = require('./admin');
var log = require('../lib/log.js').logger('roters/index.js');
var router = express.Router();



    router.get('/', server.index); // 服务

    /*
     * 用户个人操作行为
     *
     *  */
    router.get('/user/:email', user.index);
    router.get('/setting', user.showSetting);
    router.post('/setting', user.setting);

    /*
     * 登陆注册密码
     * 
     * */
    router.get('/login', sign.showLogin);
    router.post('/login', sign.login);
    router.get('/register', sign.showRegister); // 注册
    router.post('/register', sign.register); // 提交注册
    router.get('/logout', sign.logout); // 退出


    router.get('/admin', admin.index); //后台

module.exports = router;
