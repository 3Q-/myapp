'use strict';
module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    var config = {
        app: 'app',
        dist: 'dist',
    };
    grunt.initConfig({
        config: config,
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'dist/*',
                        '!dist/.git*'
                    ]
                }]
            }
        },
        requirejs: {
            compile:{
                options:{
                    "appDir": "./app",
                    "mainConfigFile": "./app/javascript/util.js",
                    "dir": "./dist",
                    "optimizeCss": "standard.keepLines",
                    "useStrict": "true",
                    "locale" : 'en-us',
                    // 使用 UglifyJS 时的可配置参数
                    // See https://github.com/mishoo/UglifyJS for the possible values.
                    optimize: "uglify",
                    uglify: {
                        toplevel: true,
                        ascii_only: true,
                        beautify: false,
                        max_line_length: 1000
                    },
                    "modules": [{
                        "name": "util",
                        "include": [
                            "jquery",
                            "bootstrap/dropdown"
                        ]
                    },{
                        "name": "controller/index",
                        "exclude": ["./util", "jquery"]
                    }]
                }
            }
        },
        uglify: {
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/javascript',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: '<%= config.dist %>/javascript',
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
                    banner: '<!-- Site built using grunt includes! -->\n'
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
        }
    });

    grunt.registerTask('default',[
        'clean',
        'requirejs',
        //'cssmin',
        //'uglify',
        'includes',
        'htmlmin'
    ]);
};
