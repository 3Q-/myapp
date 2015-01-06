var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
var log = require('./lib/log.js').logger('app.js');
var uutil = require('./lib/uutil');
var render = uutil.render;
var compression = require('compression');

app.use(compression());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.engine('html', ejs.__express);
//app.set('view engine', 'ejs');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
ejs.open = '{{';
ejs.close = '}}';

// uncomment after placing your favicon in /public
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon());

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        render(req, res, '404', {
            title : 404,
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
        title : 404,
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 8888);
app.listen(app.get('port'),function(){
    log.info('server running at '+app.get('port')+'  go  go go go..............................');
});
