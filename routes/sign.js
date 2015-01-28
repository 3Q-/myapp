var uutil = require('../lib/uutil');
var render = uutil.render;
var log = require('../lib/log.js').logger('/sign.js');
var validator = require('validator');
var dao = require('../dao');
var User = dao.User;
var eve = require('eventproxy');
var bcrypt = require('bcrypt');
var tools = require('../lib/tools');
/* GET users listing. */

exports.showLogin = function(req, res){
    var obj = {title:'login'};
    render(req, res, 'login', obj);
};

exports.login = function(req, res){

};

exports.showRegister = function(req, res){
    var obj = {title:'reg'};
    render(req, res, 'register', obj);
};

exports.register = function(req, res, next){
    var email = validator.trim(req.body.email).toLowerCase();
    var password = validator.trim(req.body.password);

    var ep = new eve();
    ep.fail(next);
    ep.on('r_err', function(msg){
        res.status(422); 
        log.error(msg);
        res.render('register', {
            title: '错',
            error: msg, 
            email: email,
            password: password
        });
    });
    if( [email,password].some(function(item){ return item===''; })){
        ep.emit('r_err', '输入信息不完整');
        return;
    }
    if (!validator.isEmail(email)) {
        return ep.emit('r_err', '邮箱不合法。');
    }

    User.getUserByEmail(email, function(err, user){
        if(err){
            log.error('-----------------新用户注册时用邮箱查找用户报错--------------');
            return next(err); 
        }
        if(user && user.email === email){
            ep.emit('r_err', '邮箱已被使用。');
            return;
        }
        tools.bhash(password, function(err, hash){
            if (err) {
                log.error('------------ 新用户注册时hash密码报错 -------------');
                return next(err);
            }
            password = hash;
            User.save(password, email, function(err, user){
                if(err){
                    log.error('------------ 新用户注册时信息保存报错 -------------');
                    return next(err);
                }
                log.error('------------ 新用户',user.email,'注册成功 -------------');
                req.session.user = user;
                res.redirect('/');
            });
        });
    });

    //render(req, res, 'register', obj);
};

exports.logout = function(){

};
