'use strict';
var express = require('express'),
    path = require('path'),
    //favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    app = express(),
    log = require('./lib/log.js').logger('app.js'),
    compression = require('compression'),
    routes = require('./routes/index'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),
    messages = require('./lib/messages'),
    user = require('./lib/user'),
    methodOverride = require('method-override'),
    env = require('./settings/env').getENV(app);

// view engine setup
app.set('views', path.join(env.views));
app.engine('html', ejs.__express);
app.set('env', env);
app.set('view engine', 'html');
ejs.open = '{{';
ejs.close = '}}';
ejs.cache = true;

app.use(express.static(path.join(env.static)));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(cookieParser('xiexie'));
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

app.use(user);
app.use(messages);
//app.use(favicon());
app.use(routes);
app.set('port', process.env.PORT || 8888);
//
var server = app.listen(app.get('port'),function(){
    log.info('server running at '+app.get('port')+'  go  go go go..............................');
});
require('./chat_server').listen(server);
