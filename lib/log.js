var log = require('logalot'),
    moment = require('moment'),
    color = require("colors"),
    now = moment().format('YYYY-MM-DD HH:mm:ss'),
    figures = require('figures'),
    mylog = {
        info : function(msg){
            console.info('', figures.info.cyan, now.cyan, msg.cyan)    
        },
        suc : function(msg){
            console.log('', figures.tick.green, now.green, msg.green)    
        },
        warn : function(msg){
            console.warn('', figures.warning.yellow, now.yellow, msg.yellow)    
        },
        err : function(msg){
            console.error('', figures.cross.red, now.red, msg.red);    
        }
    };
module.exports = mylog;
