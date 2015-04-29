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
                        '!dist/.git*'
                    ]
                }]
            }
        },
        uglify: {
            prod: {
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
        },
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/images',
                    '<%= config.dist %>/css'
                ]
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/css/{,*/}*.css']
        },
        rev: {
            options: {
                algorithm: 'md5',
                length: 8,
                process: function(basename, hash, ext) {
                    basename = basename.replace(/__\w{8}/, '');
                    return basename + '_' + hash + '.' + ext;
                }
            },
            js : {
                src  :'<%= config.dist %>/javascript/**/*.js'

            }
        },
        requirejs: {
            compile: {
                options: requireConfig
            }
        }
    });
    grunt.registerTask('tu', [,
        'useminPrepare',
        'concat:generated',
        'uglify:generated',
        'usemin'
    ]);
    grunt.registerTask('default',[
        'clean',
        'requirejs',
        //'cssmin',
        //'uglify',
        'includes',
        'htmlmin'
    ]);
};



