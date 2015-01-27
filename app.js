var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
<<<<<<< HEAD
var routes = require('./routes');
var users = require('./routes/users');
=======
>>>>>>> 77a47b903408683902a3d15fdaa282befeacc237
var app = express();
var log = require('./lib/log.js').logger('app.js');
var render = require('./lib/uutil').render;
var compression = require('compression');
var route = require('./routes/index');
var user = require('./routes/users');
var conf = require('./conf');

<<<<<<< HEAD
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
=======
app.set('env', conf.env);
app.use(compression());
app.set('views', path.join(__dirname, 'views'));
>>>>>>> 77a47b903408683902a3d15fdaa282befeacc237
app.set('view engine', 'html');
ejs.open = '{{';
ejs.close = '}}';
<<<<<<< HEAD

// uncomment after placing your favicon in /public
//app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon());

routes(app);
=======
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', route);
app.use('/user', user);
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
        res.render('404', {
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
    res.render('404', {
        title : 404,
        message: err.message,
        error: {}
    });
});
>>>>>>> 77a47b903408683902a3d15fdaa282befeacc237

app.set('port', process.env.PORT || 8888);
app.listen(app.get('port'),function(){
    log.info('server running at '+app.get('port')+'  go  go go go..............................');
});
