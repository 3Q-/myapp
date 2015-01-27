var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var routes = require('./routes');
var users = require('./routes/users');
var app = express();
var log = require('./lib/log.js').logger('app.js');
var render = require('./lib/uutil').render;
var compression = require('compression');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');
ejs.open = '{{';
ejs.close = '}}';

// uncomment after placing your favicon in /public
//app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon());

routes(app);

app.set('port', process.env.PORT || 8888);
app.listen(app.get('port'),function(){
    log.info('server running at '+app.get('port')+'  go  go go go..............................');
});
