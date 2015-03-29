var log = require('../lib/log.js').logger('index.js');
var uutil = require('../lib/uutil');
var render = uutil.render;
/* GET home page. */

exports.index = function(req, res){
    var obj = {title:'express'};
    var user = req.user || {};
    user.name="谢启勇";
    render(req, res, 'index', obj);
};
