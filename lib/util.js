var mylog = {};
var log = require('logalot');
var moment = require('moment');
var now = moment().format('YYYY-MM-DD HH:mm:ss');

mylog.info = function(msg){
    log.info(now+' '+msg)    
};
mylog.info = function(){

};

module.exports = mylog;
