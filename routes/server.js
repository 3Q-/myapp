var log = require('../lib/log.js').logger('index.js');
var uutil = require('../lib/uutil');
var render = uutil.render;
/* GET home page. */

exports.index = function(req, res){
    var obj = {title:'express'};
    var user = req.session.user;
    console.log(user);
    render(req, res, 'index', obj);
};
