'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    var config = {
        app: 'app',
        dist: 'dist',
    };

    var requireConfig = require('./helper/requireConfig.js');
    var requireJson = require('./helper/requireJson.js');
    requireConfig.modules = requireJson;

    grunt.initConfig({
        config: config,
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'dist/*',
                        '!dist/.git*',
                        '.tmp'
                    ]
                }]
            }
        },
        uglify: {
            prod: {
                options : {
                    report : 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/javascript',
                    src: ['**/*.js', '!**/*.min.js'],
                }]
            }
        },
        includes: {
            build: {
                cwd: '<%= config.app %>/views',
                src: [ '*.html'],
                dest: '<%= config.dist %>/views',
                options: {
                    ///^(\s*)include\s+"(\S+)"\s*$/
                    includeRegexp : /\{\{include\s+(\S+)\}\}/,
                    flatten: true,
                    includePath: '<%= config.app %>/views',
                    banner: '<!-- Site built using grunt includes! -->\n',
                    silent : true
                }
            }
        },


        // Watches files for changes and runs tasks based on the changed files
        htmlmin: {
            dist: {
                options: {
                    removeComments : true,
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyElements: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/views',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>/views'
                }]
            }
        },
        filerev: {
            options: {
                algorithm: 'md5',
                length: 8,
                process: function(basename, hash, ext) {
                    basename = basename.replace(/__\w{8}/, '');
                    return basename + '__' + hash + '.' + ext;
                }
            },
            js: {
                src: '<%= config.dist %>/javascript/**/*.js'
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: /\{\{\s*=\s*settings\.env\.js\s*\}\}/g,
                            replacement: 'http://s.bupobuli.com/javascript'
                        },
                        {
                            match: /\{\{\s*=\s*settings\.env\.images\s*\}\}/g,
                            replacement: 'http://s.bupobuli.com/images'
                        },
                        {
                            match: /\{\{\s*=\s*settings\.env\.css\s*\}\}/g,
                            replacement: 'http://s.bupobuli.com/css'
                        },
                    ]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['dist/views/index.html'],
                    dest: 'build/'
                }]
            }
        },
        requirejs: {
            compile: {
                options: requireConfig
            }
        }
    });

    grunt.registerTask('default',[
        'clean',
        'requirejs',
        //'cssmin',
        //'uglify',
        'includes'
        //'htmlmin'
    ]);
};



