'use strict';

module.exports = function (grunt) {
        // 配置路径变量 方便修改
    var config = {
            dev: 'dev',
            dist: 'dist',
            tmp: '.tmp'
        },
        //  r.js打包参数
        requireConfig = require('./helper/requireConfig.js'),
        //  r.js 打包 nodules 配置
        requireJson = require('./helper/requireJson.js'),
        serverType = {},
        staticUrl = {
            production : {
                js : 'http://static/bupobuli.com/scripts',
                css : 'http://static/bupobuli.com/styles',
                img : 'http://static/bupobuli.com/images'
            },
            dev : {
                js : 'scripts',
                css : 'styles',
                img : 'images'
            }
        };





    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    requireConfig.modules = requireJson;

    //  tasks 的方式 三种方式
    //  以copy task为例
    //  src 表示原文件
    //  dest 表示目标文件
    //  expand : true  表示开启额外的参数
    //  cwd:'dist/' 设置了cwd  src的目录就相对与cwd开始
    //  ext: 'min.js' 是否修改目标文件的后缀名
    //  extDot : 'first' or 'last'  从哪个地方开始修改目标文件的后缀名
    //  flatten : true  展开平铺, 其实就是把原文件复制到目标文件目录下 并且去掉目录结构
    //  rename: function(dest, src ){  这个函数是在 ext flatten运行完成之后才运行的
    //      return dest+'js'+src;
    //  }
    //  方式1
    //  copy:{
    //      copyjs : {
    //          src:'src/index.js'
    //          dest:'dest/index.js'
    //      }
    //      copyhtml : {
    //          src:'src/index.html'
    //          dest:'dest/index.html'
    //      }
    //  }
    //  方式2
    //  copy:{
    //      files : [
    //          {
    //              src:'src/index.js'
    //              dest:'dest/index.js'
    //          },
    //          {
    //              src:'src/index.html'
    //              dest:'dest/index.html'
    //          }
    //      ]
    //  }
    //  方式3 不支持额外的参数
    //  copy:{
    //      files : {
    //          //键值对的形式  键是目标文件  值是原文件
    //          'dist/index.js': 'src/index.js',
    //          'dist/index.html' : 'src/index.html'
    //      }
    //  }

    grunt.initConfig({
        config: config,
        /**
         * [clean description]
         * @type {Object}
         */
        clean: {
            //
            // dist:{
            //      //删除 dist目录下所有的文件
            //      src : 'dist/**/*'
            //      // 这个属性目录不删除 即文件夹不删除 两种方式
            //      filter : 'isFile',
            //      filter :function(filepath){
            //          return（　!grunt.file.isDir(filepath)）;
            //      },
            //      dot: true, // 为真的话 会命中以点开头的文件 比如.jshintrc .index.html
            //      matchBase : true, 只命中basename
            //
            // }
            //
            //
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'dist/*',
                        '!dist/.git*',
                        '.tmp'
                    ]
                }]
            },
            tmp:{
                src: '<%= config.tmp %>'
            }
        },
        watch: {
            js: {
                files: ['<%= config.dev %>/scripts/{,*/}*.js'],
                options: {
                    livereload: true
                }
            },
            tpl: {
                files: [
                    '<%= config.dev %>/views/**/*.ejs',
                    '<%= config.dev %>/data/{,*/}*.json'
                    ],
                tasks : ['preview'],
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.dev %>/styles/{,*/}*.css',
                    '<%= config.dev %>/images/{,*/}*'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: '127.0.0.1',
                base:'/projects/xiexie/dev/views/preview'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static('/projects/xiexie/dev/views/preview'),
                            connect.static(config.dev)
                        ];
                    }
                }
            }
        },
        uglify: {
            dist: {
                options : {
                    report : 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/scripts',
                    src: ['**/*.js', '!**/*.min.js'],
                }]
            }
        },
        includes: {
            dist: {
                cwd: '<%= config.dev %>/views',
                src: [ '*.html'],
                dest: '<%= config.dist %>/views',
                options: {
                    ///^(\s*)include\s+"(\S+)"\s*$/
                    includeRegexp : /\{\{include\s+(\S+)\}\}/,
                    flatten: true,
                    includePath: '<%= config.dev %>/views',
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
        rev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            js: {
                src: '<%= config.dist %>/scripts/**/*.js'
                    //dest: '<%= config.dist %>/scripts'
            }
        },
        /**
         * [usemin description]
         * @type {Object}
         */
        usemin: {
            dist: ['<%= config.dist %>/views/**/*.html'],
            //css : '',
            options: {
                assetsDirs: ['<%= config.dist %>/','<%= config.dist %>/scripts'],
                debug : true,
                patterns: {
                    dist: [
                            [
                                /<script.+src=['"]http:\/\/static\.bupobuli\.com\/([^"']+)["']/gm
                                ///<script.+src=['"]([^"']+)["']/gm
                            ],
                            [
                                /require\(\[['"]http:\/\/static\.bupobuli\.com\/([^'"]+)['"]\]/gm,
                            ],
                            [
                                ///require\(\[['"]([^'"]+)['"]\s*\]\s*\)/gm,

                            ]
                        ]
                        //css : []
                }
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [{
                        match: /\{\{\s*static_js\s*\}\}/gm,
                        replacement: 'http://s.bupobuli.com/scripts'
                    }, {
                        match: /\{\{\s*static_img\s*\}\}/gm,
                        replacement: 'http://s.bupobuli.com/images'
                    }, {
                        match: /\{\{\s*static_css\s*\}\}/gm,
                        replacement: 'http://s.bupobuli.com/styles'
                    }, ]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['<%= config.dist %>/views/**/*.html'],
                    dest: '<%= config.dist %>/views/'
                }]
            },
            develop: {
                options: {
                    patterns: [{
                        match: /\{\{\s*=\s*static_js\s*\}\}/g,
                        replacement: 'scripts'
                    }, {
                        match: /\{\{\s*=\s*static_img\s*\}\}/g,
                        replacement: 'images'
                    }, {
                        match: /\{\{\s*=\s*static_css\s*\}\}/g,
                        replacement: 'styles'
                    }, ]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['<%= config.dist %>/views/**/*.html'],
                    dest: '<%= config.dist %>/views/'
                }]
            }
        },
        requirejs: {
            compile: {
                options: requireConfig
            }
        },
        'ejs_static': {
            preview: {
                options: {
                    dest: 'dev/views/preview',
                    path_to_data: 'dev/data/data.json',
                    path_to_layouts: 'dev/views/layouts/',
                    index_page: 'index',
                    parent_dirs: false,
                    underscores_to_dashes: true,
                    file_extension: '.html',
                    underscore: true,
                    helpers: {
                        static: function(type) {
                            return serverType[type];
                        }
                    }
                }
            },
            dist: {
                options: {
                    dest: 'dist/views',
                    path_to_data: 'dev/data/data.json',
                    path_to_layouts: 'dev/views/layouts/',
                    index_page: 'index',
                    parent_dirs: false,
                    underscores_to_dashes: true,
                    file_extension: '.html',
                    underscore: true,
                    helpers: {
                        static: function(type) {
                            return serverType[type];
                        }

                    }
                }
            },
        }
    });
    grunt.registerTask('server', function(target) {
        grunt.taskType = target;

        if (target === 'dev') {
            grunt.task.run(['develop', 'watch']);

        } else if (target === 'production') {
            grunt.task.run(['output']);
        }
    });

    grunt.registerTask('built', function(target){
        grunt.taskType = target;
        serverType = staticUrl.production || {};

        grunt.task.run([
            'clean',
            'requirejs',
            'ejs_static:dist',
            'rev',
            'usemin',
            'htmlmin'
        ]);
    });
    grunt.registerTask('dev', function(target){
        grunt.task.run([
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('preview', function(target){
        grunt.taskType = target;
        serverType = staticUrl.dev || {};
        grunt.task.run([
            'ejs_static:preview'
        ]);
    });
    grunt.registerTask('default',[
        'clean',
        'requirejs',
        'ejs_static:dist',
        //'cssmin',
        //'uglify',
        //'includes',
        //'replace:dist'
        'rev',
        'usemin',
        'htmlmin'
    ]);
};



