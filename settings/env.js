var log = require('../lib/log.js').logger('settings/env.js');
exports.getENV = function(app){
    'use strict';
    var env = {};
    if(app.get('env') === 'production'){
        log.info('============================running at production==================================');
        env = {
            js : 'http://s.bupobuli.com/static/js',
            css : 'http://s.bupobuli.com/static/css',
            img : 'http://s.bupobuli.com/static/img',
            views : '/projects/xiexie/dist/views',
            static : '/projects/xiexie/dist/static'
        };
    }else if(app.get('env') === 'development'){
        log.info('============================running at development==================================');
        env = {
            js : '/static/js',
            css : '/static/css',
            img : '/static/img',
            uploads : '/uploads/',
            views : '/projects/xiexie/app/views',
            static : '/projects/xiexie/app/static'
        };
    }else{
        log.info('============================running at test==================================');
        env = {
            js : '/static/js',
            css : '/static/css',
            img : '/static/img',
            uploads : '/uploads/',
            views : '/projects/xiexie/dist/views',
            static : '/projects/xiexie/dist/static'
        };
    }
    return env;
};
