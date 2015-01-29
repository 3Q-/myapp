var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' },
        { 
            type: 'dateFile', 
            filename: '/home/logs/xiexie/log',
            pattern: '_yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    ],
    replaceConsole: true
});
exports.logger=function(name){
    var logger = log4js.getLogger(name);
    logger.setLevel('DEBUG');
    return logger;
};
