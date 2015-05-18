'use strict';

var path = require('path'),
 	util = require('util');

if(/win/.test(process.platform)) {
	var _join = path.join;

	path.join = function() {
		return _join.apply(null, arguments).replace(/[\s\S]*(\w:[^:]+)$/,'$1');
	};
}

module.exports = function(grunt) {

	grunt.file.setBase(__dirname);

	var config, myConfig, requireConfig;

	config = require('./config.json');

	try {
		myConfig = require('./myconfig.json');
	}catch(err) {
		myConfig = {};
	}

	for(var key in myConfig) {
		config[key] = myConfig[key];
	}

	requireConfig = require('./helpers/require.json');

	var EMPTY_FIXED = '__',
		PORT = grunt.option('port') || config.port || '9001',
		APP_NAME = config.app || 'usercenter,common',
		MODULE_PATH = grunt.option('nodepath') || config.nodePath || __dirname,
		ASSET_PATH = config.assetPath || '',
		PAGE_PATH = config.pagePath || '',
		DEV_ASSET_DIR = 'assets/',
		DEV_PAGE_DIR = 'public/',
		TEM_ASSET_DIR = 'assets/temp/',
		TEM_PAGE_DIR = 'pages/temp/',
		REQUIRE_BUILT_DIR = 'require_built/',
		TASK_TYPE = grunt.cli.tasks[0].replace('server:',''),
		SURL = {
			dev: 'http://s1.acc369.com',
			production: 'http://s.acc369.com'
		};

	var depMgr = require(path.join(MODULE_PATH, 'matchdep'));

	depMgr
	.filterDev('grunt-*', path.join(__dirname, 'package.json'))
	.forEach(function(name) {
		grunt.task.loadTasks(path.join(MODULE_PATH, name, 'tasks'));
	});

	grunt.task.loadTasks(path.join(MODULE_PATH, 'assemble', 'tasks'));

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		assemble: {
			options: {
				host: SURL[TASK_TYPE],
				layoutdir: 'layouts',
				partials: 'modules/**/*.hbs',
				data: 'data/**/*.json',
				helpers: 'helpers/assemble.js',
				ext: '.jsp'
			},
			make: {
				files:[{
					expand: true,
					cwd: 'pages/',
					src: ['{'+APP_NAME+','+EMPTY_FIXED+'}/**/*.hbs'],
					dest: TEM_PAGE_DIR
				}]
			}
		},

		cssmin: {
			options : {
		        compatibility : 'ie8',
		        noAdvanced : true
		    },
			make: {
				files: [{
					expand: true,
					cwd: DEV_ASSET_DIR,
					src: ['{'+APP_NAME+','+EMPTY_FIXED+'}/css/**/*.css'],
					dest: ASSET_PATH,
					ext: '.css'
				}]
			}
		},

		filerev: {
			options: {
				algorithm: 'md5',
				length: 8,
				process: function(basename, hash, ext) {
					basename = basename.replace(/__\w{8}/,'');
					return basename+'__'+hash+'.'+ext;
				}
			},
			css: {
				src: [path.join(ASSET_PATH,'{'+APP_NAME+','+EMPTY_FIXED+'}/css/**/*.css')]
			},
			js: {
				src: [path.join(ASSET_PATH,'{'+APP_NAME+','+EMPTY_FIXED+'}/js/**/*.js')]
			},
			img: {
				src: [path.join(ASSET_PATH,'{'+APP_NAME+','+EMPTY_FIXED+'}/img/**/*.{png,jpg,gif}')]
			},
			swf: {
				src: [path.join(ASSET_PATH,'{'+APP_NAME+','+EMPTY_FIXED+'}/**/*.swf')]
			}
		},

		usemin: {
			tpl: path.join(PAGE_PATH,'**/*.{jsp,html}'),
			stylesheet: path.join(ASSET_PATH,'**/*.css'),
			options: {
				assetsDirs: ASSET_PATH,
				patterns: {
					tpl: [[
						new RegExp(SURL['production']+'\\/([^\'"\\?]+)', 'gm')
					]],
					stylesheet: [[
						/\/([^'"\?]+?\.(?:jpg|png|gif))/gm
					]]
				}
			}
		},

		requirejs: createRequirejsOption(),

		copy: {
            devTpl: {
                expand: true,
                cwd: TEM_PAGE_DIR,
                src: '**',
                dest: DEV_PAGE_DIR,
                options: {
                    process: function (content, srcpath) {
                        return insertAssets('dev', content);
                    }
                }
            },

            outputTpl: {
                expand: true,
                cwd: TEM_PAGE_DIR,
                src: '**',
                dest: PAGE_PATH,
                options: {
                    process: function (content, srcpath) {
                        return insertAssets('production', content);
                    }
                }
            },

            outputJs: {
                expand: true,
                cwd: REQUIRE_BUILT_DIR,
                src: '**/*.js',
                dest: ASSET_PATH
            },

            outputImg: {
                expand: true,
                cwd: DEV_ASSET_DIR,
                src: '{'+APP_NAME+','+EMPTY_FIXED+'}/img/**/*.{png,jpg,gif}',
                dest: ASSET_PATH
            }
		},

		clean: {
			options: {
				force: true
			},
			reset: [TEM_PAGE_DIR, REQUIRE_BUILT_DIR],
			tpl: [TEM_PAGE_DIR],
			rjs: [REQUIRE_BUILT_DIR],
			rev: [path.join(ASSET_PATH,'{'+APP_NAME+','+EMPTY_FIXED+'}/**/*.{css,js,swf,jpg,png,gif}')]
		},

		watch: {
            options: {
                livereload: {
                    port: PORT
                },
                interrupt: true
            },
            tpl: {
                files: ['pages/{'+APP_NAME+','+EMPTY_FIXED+'}/**/*.hbs','{layouts,modules}/**/*.hbs','data/**/*.json','helpers/**/*.{js,json}'],
                tasks: ['watchHelper:tpl'],
                options: {
                    nospawn: true
                }
            },
            css: {
                files: [DEV_ASSET_DIR+'{'+APP_NAME+','+EMPTY_FIXED+'}/css/**/*.css', DEV_ASSET_DIR+'css/**/*.css'],
                tasks: ['watchHelper:css'],
                options: {
                    nospawn: true
                }
            },
            js: {
                files: [DEV_ASSET_DIR+'{'+APP_NAME+','+EMPTY_FIXED+'}/**/*.js', DEV_ASSET_DIR+'js/**/*.js'],
                tasks: ['watchHelper:js'],
                options: {
                    nospawn: true
                }
            }
		}

	});

	grunt.registerTask('watchHelper', function(target) {
		switch(target) {
			case 'tpl': {
                if(grunt.taskType === 'dev') {
                    grunt.task.run(['develop']);
                }

				break;
			}

		}
	});


/*	grunt.registerTask('test', ['filerev']);*/

	grunt.registerTask('rjs', createRequirejsTask());

	grunt.registerTask('develop', ['clean:reset', 'assemble', 'copy:devTpl', 'clean:tpl']);
	grunt.registerTask('output', ['clean:reset', 'assemble', 'clean:rev', 'cssmin', 'rjs', 'copy:outputJs', 'clean:rjs', 'copy:outputImg', 'filerev', 'copy:outputTpl', 'clean:tpl', 'usemin']);

	grunt.registerTask('server', function(target) {
		grunt.taskType = target;

		if(target === 'dev') {
			grunt.task.run(['develop', 'watch']);

		}else if(target === 'production') {
			grunt.task.run(['output']);
		}
	});

	function createRequirejsOption() {
		var opt = {},
			apps = APP_NAME.split(',');

		apps.forEach(function(app) {
			var cfg = requireConfig[app];

			if(cfg) {
				opt['compile_'+app] = {
					options: {
						appDir: './assets/'+app,
						baseUrl: '../',
						paths: cfg.paths,
						removeCombined: true,
						optimizeCss: 'none',
						skipDirOptimize: true,
						fileExclusionRegExp: /^(?:css|img)$/,
						dir: './require_built/'+app,
						modules: cfg.modules
					}
				};
			}
		});

		return opt;
	}

	function createRequirejsTask() {
		var apps = APP_NAME.split(','),
			tasks = [];

		apps.forEach(function(app) {
			var cfg = requireConfig[app];

			cfg && tasks.push('requirejs:compile_'+app);
		});

		return tasks;
	}

	function insertAssets(type, content) {
		var d = new Date(),
            v = '' + d.getFullYear() + (d.getMonth() + 1) + d.getDate() + d.getHours() + d.getMinutes();

        //combo
        var css = '',
            js = '',
            rjs = '',

            // 静态资源收集后放在这里
            res = {},

            // 脚本收集后放在这里
            scripts = [],

            //缓存起来，可以用来去重
            cache = {},

            // 配置host属性的映射关系
            hosts = {
                res: SURL['production'],
                dev: SURL['dev']
            },

            surl = SURL[type],

            // 匹配combo标记
            combo_re = /<!--\s*combo(css|js)(?:\[host=(.*)\])?:([\s\S]*?)-->/gm,
            // 匹配script注入标记
            script_re = /<!--\s*{script_start}([\s\S]*?){script_end}\s*-->/gm,
            // 匹配requirejs注入标记
            requirejs_re = /<!--\s*requirejs\[app=(.*)\]:\s*(.+?)\s*-->/gm,

            // 用来切分多个资源
            res_re = /\S+/gm;


        if(config.hosts) {
            for(var i in config.hosts) {
                hosts[i] = config.hosts[i];
            }
        }

        //收集资源
        var addUrl = function(fileType, host, urls) {
            host = host || type === 'dev' ? 'dev' : 'res';
            res[host] || (res[host] = {js:[],css:[]});

            var result = urls.match(res_re);
            for(var i=0,l=result.length;i<l;i++) {
                var url = result[i];

                if(!cache[host+'_'+url]) {
                    cache[host+'_'+url] = 1;

                    res[host][fileType].push(url);
                }
            }
        };


        // nodejs中replace带callback时会变成异步，所以用test
        while(combo_re.test(content)) {
            addUrl(RegExp.$1, RegExp.$2, RegExp.$3);
        }

        while(script_re.test(content)) {
            scripts.push(RegExp.$1);
        }

        if(scripts.length) {
        	scripts = '<script type="text/javascript">'+scripts.join('')+'</script>';
        }else {
        	scripts = '';
        }

        while(requirejs_re.test(content)) {
        	var app = RegExp.$1,
        		baseUrl = surl+'/'+app,
                appConfig = requireConfig[app] || {};

        	rjs =
        	'<script type="text/javascript" src="'+surl+'/common/js/require.js"></script>'+
        	'<script type="text/javascript">'+
        		'require(["'+baseUrl+'/js/boot.js"], function() {'+
        			'require(["'+surl+'/'+RegExp.$2+'"]);'+
        		'});'+
        	'</script>';
        }

        for(var i in res) {
            if(typeof hosts[i] === 'undefined') {
                continue;
            }

            switch(type) {
                case 'production': {
/*                    if(res[i].js.length) {
                        var url = hosts[i] + '??' + res[i].js.join(',');
                        js += '<script src="'+url+'" type="text/javascript"></script>';
                    }

                    if(res[i].css.length) {
                        var url = hosts[i] + '??' + res[i].css.join(',');
                        css += '<link rel="stylesheet" href="'+url+'" type="text/css" />';
                    }

                    break;
*/
				}

                case 'dev': {
                    if(res[i].js.length) {
                        res[i].js.forEach(function(url) {
                            js += '<script src="'+hosts[i]+url+'" type="text/javascript"></script>';
                        });
                    }

                    if(res[i].css.length) {
                        res[i].css.forEach(function(url) {
                            css += '<link rel="stylesheet" href="'+hosts[i]+url+'" type="text/css" />';
                        });
                    }

                    break;
                }
            }

        }

        content = content
	    	.replace(combo_re, '')
	        .replace(script_re, '')
	        .replace(requirejs_re, '')
	        .replace(/<!--\s*js_holder\s*-->/gm, js)
	        .replace(/<!--\s*css_holder\s*-->/gm, css)
	        .replace(/<!--\s*requirejs_holder\s*-->/gm, rjs)
	        .replace(/<!--\s*script_holder\s*-->/gm, scripts)
	        .replace(/<\/head>/g, '<script>var baseUrl = surl = "'+surl+'";</script></head>');

        if(type != 'production') {
            content = content.replace(/<\/body>/g, '<script src="http://127.0.0.1:'+PORT+'/livereload.js"></script></body>');
        }

        return content;
	}
};
