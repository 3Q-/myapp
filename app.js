var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var app = express();
var log = require('./lib/log.js').logger('app.js');
var render = require('./lib/uutil').render;
var compression = require('compression');
var routes = require('./routes/index');
var conf = require('./conf');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('env', conf.env);
app.set('view engine', 'html');
ejs.open = '{{';
ejs.close = '}}';

// uncomment after placing your favicon in /public
//app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    store: new RedisStore({
        st:'127.0.0.1',
        prefix:'sess',
		ttl: 60*60*24*5 // 单位秒 session 5 天过期
    }),
    key : 'tickit',
    secret: 'this-is-redis-secret-fuck-you-mather-and-all',
    resave: false,
    cookie:{maxAge:3600000*24*5, path:'/'}, // 单位毫秒
    saveUninitialized:true
}));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon());

app.use(routes);

app.set('port', process.env.PORT || 8888);
app.listen(app.get('port'),function(){
    log.info('server running at '+app.get('port')+'  go  go go go..............................');
});
