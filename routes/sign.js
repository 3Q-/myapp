var uutil = require('../lib/uutil');
var render = uutil.render;
var log = require('../lib/log.js').logger('sign.js');
/* GET users listing. */

exports.showLogin = function(req, res){

};

exports.login = function(req, res){

};

exports.showRegister = function(req, res){
    var obj = {title:'reg'};
    render(req, res, 'register', obj);
};

exports.register = function(req, res){
    var obj = {};
    render(req, res, 'register', obj);
};

exports.logout = function(){

};
