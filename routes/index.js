var server = require('./server');
var users = require('./users');
var admin = require('./admin');
var login = require('./login');
var register = require('./register');
var log = require('../lib/log.js').logger('index.js');
var uutil = require('../lib/uutil');
var render = uutil.render;

module.exports = function(app){
    app.use('/', server);
    app.use('/user', users);
    app.use('/login', login);
    app.use('/register', register);
    app.use('/admin', admin);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new error('not found');
        err.status = 404;
        next(err);
    });

    // error handlers
    // development error handler
    // will print stacktrace
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV=== 'development') {
        console.log('dev');
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            render(req, res, '404', {
                title: 1,
                message: err.message,
                error: {}
            });
        });
    }
    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        render(req, res, '404', {
            title: 1,
            message: err.message,
            error: {}
        });
    });

};
