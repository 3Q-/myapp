'use strict';
module.exports = {
    'appDir': './app',
    'baseUrl': './javascript',
    'mainConfigFile': './app/javascript/util.js',
    'dir': './dist',
    'optimizeCss': 'standard.keepLines',
    'useStrict': true,
    'locale': 'en-us',
    // 使用 UglifyJS 时的可配置参数
    // See https://github.com/mishoo/UglifyJS for the possible values.
    'optimize': 'uglify2',
    //如果设置为true，在输出目录将会删除掉已经合并了的文件
    'removeCombined' : true,
    'fileExclusionRegExp': /^(css|images|views|fonts)/,
    'uglify2': {
        'compress': {
            'drop_console': true
        }
    },
    onBuildRead: function(moduleName, path, contents) {
        if (moduleName === 'util') {
            contents = contents.replace(/javascript/img, 'http://s.bupobuli.com/javascript');
        }
        return contents;
    }
};
