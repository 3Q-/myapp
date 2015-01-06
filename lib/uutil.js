var util = require('util');
var conf = require('../conf');
var log = require('./log').logger('lib/uutil.js');

exports.render = function(req, res, templateName, params){
    res.cookie('good', 'ggggggggggggggggggggggg');
    params = util._extend({
        env : conf.env,
        title : 'xieqiyong'
    }, params);
	res.render(templateName, params);
};
