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

var notJump = ['register']; // 登陆后不让返回的页面

exports.showLogin = function(req, res){
    req.session._loginReferer = req.headers.referer;
    var obj = {title:'login', password:'', email:''};
    render(req, res, 'login', obj);
};

exports.login = function(req, res, next){
    var email = validator.trim(req.body.email).toLowerCase();
    var password = validator.trim(req.body.password);
    var ep = new eve();
    ep.fail(next);
    ep.on('l_err', function(msg){
        res.status(422); 
        log.error(msg);
        res.render('login', {
            title: 'Login',
            error: msg, 
            email: email,
            password: password
        });
    });
    if (!validator.isEmail(email)) {
        res.message('请输入正确邮箱!');
        return ep.emit('l_err', email+'邮箱不合法。');
    }
    if (!validator.isLength(password, 8)) {
        res.message('请输入8位或8位以上密码!');
        return ep.emit('l_err', '密码长度不够');
    }

    User.getUserByEmail(email, function(err, user){
        if(err){
            log.error('--------- '+ email +' 登陆的时候查找该邮箱数据库报错 ------------');
            return next(err);
        }
        if(!user){
            res.message('该账户不存在');
            return ep.emit('l_err', '用户不存在');
        }

        tools.bcompare(password, user.salt, function (err, hash) {
            if(err){
                log.error('登陆时密码hash的时候报错');
                return ep.emit('l_err', '程序问题 登陆不了密码不对赶紧处理');
            }
            if(hash === user.password){
                var refer = req.session._loginReferer || '/', i;
                for (i = 0, len = notJump.length; i !== len; ++i) {
                    if (refer.indexOf(notJump[i]) >= 0) {
                        refer = '/';
                        break;
                    }
                }
                req.session.user = user;
                log.debug(user.email+'登陆成功!!!!');
                res.redirect(refer);
            }else{
                res.message('密码不正确');
                return ep.emit('l_err', email+'输入密码不正确');
            }
        });
    });
};

exports.showRegister = function(req, res){
    var obj = {title:'Register', password:'', email:''};
    render(req, res, 'register', obj);
};

exports.register = function(req, res, next){
    var email = validator.trim(req.body.email).toLowerCase();
    var password = validator.trim(req.body.password);


    var ep = new eve();
    ep.fail(next);
    ep.on('r_err', function(msg){
        res.status(422); 
        console.log(msg);
        res.render('register', {
            title: 'Register',
            error: msg, 
            email: email,
            password: password
        });
    });

    if (!validator.isEmail(email)) {
        res.message('请输入正确邮箱!');
        return ep.emit('r_err', email+' 不是邮箱合法。');
    }

    if (!validator.isLength(password, 8)) {
        return ep.emit('r_err', '密码长度不够');
    }

    User.getUserByEmail(email, function(err, user){
        if(err){
            log.error('-----------------新用户注册时用邮箱查找用户报错--------------');
            return next(err); 
        }
        if(user && user.email === email){
            ep.emit('r_err',email+' 邮箱已被使用。');
            return;
        }
        tools.bhash(password, function(err, salt, hash){
            if (err) {
                log.error('------------ 新用户注册时hash密码报错 -------------');
                return next(err);
            }

            var obj = {};
            obj.password = hash;
            obj.email = email;
            obj.salt = salt;
            User.save(obj, function(err, user){
                if(err){
                    log.error('------------ 新用户注册时信息保存报错 -------------');
                    return next(err);
                }
                log.debug('------------ 新用户',user.email,'注册成功 -------------');
                req.session.user = user;
                res.redirect('/');
            });
        });
    });

    //render(req, res, 'register', obj);
};

exports.logout = function(req, res, next){
    req.session.destroy();
    res.clearCookie('tickit', { path: '/' });
    res.redirect('/');
};
