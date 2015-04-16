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
        copy: {
            src: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/static/js',
                    src: ['**/*.min.js'],
                    dest: '<%= config.dist %>/static/js',
                },{
                    expand: true,
                    cwd: '<%= config.app %>/static',
                    src: ['fonts/*', '*.{ico,png.txt}'],
                    dest: '<%= config.dist %>/static',
                }]
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/static/img',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/static/img'
                }]
            }
        },
        uglify: {
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/static/js',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: '<%= config.dist %>/static/js',
                }]
            }
        },
        cssmin: {
            prod: {
                options: {
                    report: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/static/css',
                    src: ['**/*.css'],
                    dest: '<%= config.dist %>/static/css',
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
        'copy',
        'imagemin',
        'cssmin',
        'uglify',
        'includes',
        'htmlmin'
    ]);
};
