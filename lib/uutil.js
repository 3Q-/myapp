'use strict';
var util = require('util');
var log = require('./log').logger('lib/uutil.js');
//var keyword = require('../settings/keyword');

exports.render = function(req, res, templateName, params){
    params.title = params.title ? params.title +' - 不破不立' : '不破不立';
    params = util._extend({
        keyword : '不破不立,破而后立',
    }, params);
    log.info(params);
	res.render(templateName, params);
};
