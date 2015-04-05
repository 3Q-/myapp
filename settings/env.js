exports.getENV = function(app){
    'use strict';
    var env = {};
    if(app.get('env') === 'production'){
        env = {
            js : 'http://s.bupobuli.com/static/js',
            css : 'http://s.bupobuli.com/static/css',
            img : 'http://s.bupobuli.com/static/img',
            views : __dirname +'/../dist/views',
            static : __dirname +'/../dist/static'
        };
    }else if(app.get('env') === 'development'){
        env = {
            js : '/static/js',
            css : '/static/css',
            img : '/static/img',
            uploads : '/uploads/',
            views : '/projects/xiexie/app/views',
            static : '/projects/xiexie/app/static'
        };
    }else{
        env = {
            js : '/static/js',
            css : '/static/css',
            img : '/static/img',
            uploads : '/uploads/',
            views : __dirname +'/../dist/views',
            static : __dirname +'/../dist/static'
        };
    }
    return env;
};
