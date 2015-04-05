'use strict';
var uutil = require('../lib/uutil');
var render = uutil.render;
exports.index = function(req, res){
    render(req, res, 'blessingswish');
};
