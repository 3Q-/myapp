var log = require('../lib/log.js').logger('settings/env.js');
exports.getENV = function(app){
    'use strict';
    var env = {};
    if(app.get('env') === 'production'){
        log.info('============================running at production==================================');
        env = {
            js : 'http://s.bupobuli.com/javascript',
            css : 'http://s.bupobuli.com/css',
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
            views : '/projects/xiexie/app/views',
            static : '/projects/xiexie/app/'
        };
    }else{
        log.info('============================running at test==================================');
        env = {
            js : 'javascript',
            css : 'css',
            img : 'images',
            uploads : '/uploads/',
            views : '/projects/xiexie/dist/views',
            static : '/projects/xiexie/dist/static'
        };
    }
    return env;
};
