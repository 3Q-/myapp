var log = require('logalot'),
    moment = require('moment'),
    color = require("colors"),
    now = moment().format('YYYY-MM-DD HH:mm:ss'),
    figures = require('figures'),
    mylog = {
        loger : function(name){
            this.name = name;
            return this;
        },
        info : function(msg){
            console.info('', figures.info.cyan, now.cyan,this.name.cyan, '>>'.cyan, msg)    
        },
        suc : function(msg){
            console.log('', figures.tick.green, now.green,this.name.green, '>>'.green,  msg)    
        },
        warn : function(msg){
            console.warn('', figures.warning.yellow, now.yellow,this.name.yellow, '>>'.yellow, msg)    
        },
        err : function(msg){
            console.error('', figures.cross.red, now.red,this.name.red, '>>'.red, msg);    
        }
    };
module.exports = mylog;
