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
                    optimize: "uglify2",
                    uglify2: {
                        toplevel: true,
                        ascii_only: true,
                        beautify: true,
                        max_line_length: 1000,
                        compress : {
                            drop_console:true
                        }
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
                options : {
                    report : 'gzip'
                },
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
                    banner: '<!-- Site built using grunt includes! -->\n',
                    silent : true
                }
            }
        },
        rev : {
            options : {
                encoding : 'utf8',
                algorithm : 'md5',
                length : 8
            },
            dist : {
                files : [{
                    src:['<%= config.dist %>/javascript/**/*.js']
                }]
            }
        },


        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>/views'
                ],
                blockReplacements: {
                    css: function (block) {
                        console.log('css', block);
                    },
                    js: function (block) {
                        console.log('js',block);
                    },
                    html: function (block) {
                        console.log('html', block);
                    }
                }

            },
            html: ['<%= config.dist %>/views/**/*.html'],
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
        'includes'
        //'htmlmin'
    ]);
};
