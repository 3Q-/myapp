'use strict';
module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    var config = {
        app: 'app',
        dist: 'dist',
        views : 'views'
    };
    grunt.initConfig({
        config: config,
        copy: {
            dist:{
                files: [{
                    expand : true,
                    cwd : '<%= config.views%>',
                    dest : '<%= config.dist%>',
                    src : '{,*/}*.html'
                }]
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
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        }
    });
};
