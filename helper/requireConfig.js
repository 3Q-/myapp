'use strict';
module.exports = {
    'appDir': './dev',
    'baseUrl': './scripts',
    'mainConfigFile': './dev/scripts/util.js',
    'dir': './dist',
    'optimizeCss': 'standard.keepLines',
    'useStrict': true,
    'locale': 'en-us',
    // 使用 UglifyJS 时的可配置参数
    // See https://github.com/mishoo/UglifyJS for the possible values.
    'optimize': 'uglify2',
    //如果设置为true，在输出目录将会删除掉已经合并了的文件
    'removeCombined' : true,
    'fileExclusionRegExp': /^(css|images|views|fontsgru)/,
    'uglify2': {
        'compress': {
            'drop_console': true
        }
    },
    onBuildRead: function(moduleName, path, contents) {
        if (moduleName === 'util') {
            contents = contents.replace(/scripts/img, 'http://static.bupobuli.com/scripts');
        }
        return contents;
    }
};
