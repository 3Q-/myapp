'use strict';
var log = require('../lib/log.js').logger('settings/env.js');
exports.getENV = function(app){
    var env = {};
    if(app.get('env') === 'production'){
        log.info('============================running at production==================================');
        env = {
            js : 'http://s.bupobuli.com/scripts',
            css : 'http://s.bupobuli.com/styles',
            img : 'http://s.bupobuli.com/images',
            views : '/projects/xiexie/dist/views',
            static : '/projects/xiexie/dist'
        };
    }else if(app.get('env') === 'development'){
        log.info('============================running at development==================================');
        env = {
            js : 'javascript',
            css : 'css',
            img : 'images',
            uploads : '/uploads/',
            views : '/projects/xiexie/dev/views/preview',
            static : '/projects/xiexie/app/'
        };
    }else{
        log.info('============================running at test==================================');
        env = {
            js : 'javascript',
            css : 'css',
            img : 'images',
            uploads : '/uploads/',
            views : '/projects/xiexie/dev/views/preview',
            static : '/projects/xiexie/dist/static'
        };
    }
    return env;
};
/**
 * fundescription
 * @param  {number} a 加数
 * @param  {number} b 加数
 * @return {number}   返回两个数的和
 */
var fun = function(a, b){
    return a+b;
};
fun();
