exports.getENV = function(app){
    'use strict';
    var env = {};
    if(app.get('env') === 'production'){
        env = {
            js : 'http://s.bupobuli.com/static/javascript',
            css : 'http://s.bupobuli.com/static/css',
            img : 'http://s.bupobuli.com/static/image',
            views : __dirname +'/../dist/views',
            static : __dirname +'/../dist/static'
        };
    }else if(app.get('env') === 'development'){
        env = {
            js : '/static/javascript',
            css : '/static/css',
            img : '/static/image',
            uploads : '/uploads/',
            views : '/projects/xiexie/app/views',
            static : '/projects/xiexie/app/static'
        };
    }else{
        env = {
            js : '/static/javascript',
            css : '/static/css',
            img : '/static/image',
            uploads : '/uploads/',
            views : __dirname +'/../dist/views',
            static : __dirname +'/../dist/static'
        };
    }
    return env;
};
