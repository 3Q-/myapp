var util = require('util');
var conf = require('../conf');
var log = require('./log').logger('lib/uutil.js');

exports.render = function(req, res, templateName, params){
    params = util._extend({
        env : conf.env
    }, params);
	res.render(templateName, params);
};
