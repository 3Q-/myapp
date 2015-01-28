var uutil = require('../lib/uutil');
var render = uutil.render;
var log = require('../lib/log.js').logger('users.js');

/* GET users listing. */

exports.index = function(req, res){
    var obj = {title:'express'};
    render(req, res, 'index', obj);
};

exports.showSetting = function(req, res){
    var obj = {title:'express'};
    render(req, res, 'index', obj);
};

exports.setting = function(req, res){
    var obj = {title:'express'};
    render(req, res, 'index', obj);
};
