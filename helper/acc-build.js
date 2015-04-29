/**
* @fileoverview 前端项目工作流 任务管理工具
* @author yikehao
* @mail yikehao@gmail.com
* @version 0.0.1
*/

var fs = require('fs');
var path = require('path');
var https = require('https');
var exec = require('child_process').exec;
var EmitterClass = require('events').EventEmitter;
var emitter = new EmitterClass();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var LOG = {
    DEFAULT: '',
    ERROR: 'red',
    GOOD: 'green',
    WARN: 'yellow',
    FUN: 'pink',
    EM: 'cyan',
    TIPS: 'gray'
};
var log = function(text, color) {
    var colors = {
        red: 31,
        green: 32,
        yellow: 33,
        blue: 34,
        pink: 35,
        cyan: 36,
        gray: 90
    };

    return console.log('\033[' + (colors[color] || '00') + 'm'+text+'\033[0m');
}

// 定义每个步骤
var STEP = {
    BEGIN: 0,
    CONFIG: 1,
    GRUNT_TASK: 2,
    APP_NAME: 3,
    NODE_PATH: 4,
    PORT: 5,
    PAGE_PATH: 6,
    ASSETS_PATH: 7
};

// 空数据，用于跳过终端输入的等待
var EMPTY_DATA = 'empty_data_'+Date.now();

// 定义任务类型
var TASK_TYPE = {
    Y_OR_N: 0,
    CHOOSE: 1,
    INPUT: 2,
    DEFERRED: 3
}

// 用来收集用户输入的任务配置数据
var task_config = {
    nodePath: 'd:/nodejs/node_modules/'

};

// 任务管理器
var taskManager = {
    /**
    * 程序开始启动的标记，用于防止重复启动
    */
    hasStart: false,

    /**
    * 当前执行的任务
    */
    curTask: null,

    /**
    * 所有注册的任务都放在这里
    */
    tasks: {},

    /**
    * 任务队列，有时需要任务按一定的顺序执行
    */
    queue: [],

    /**
    * 注册一个任务
    * @return {Object taskManager}
    * @param {Number} tid 任务ID，从STEP中选择
    * @param {Object} opt 任务的配置，会成为任务实例的属性
    */
    register: function(tid, opt) {

        if(!this.tasks[tid]) {
            this.tasks[tid] = [];

        }

        opt.id = tid;
        var task = new Task(opt);

        this.tasks[tid].push(task);

        return this;
    },

    /**
    * 删除一组任务
    * @param {Number} tid 任务ID，从STEP中选择
    */
    remove: function(tid) {
        this.tasks[tid] = null;
    },

    /**
    * 执行一组任务
    * @param {Number} tid 任务ID，从STEP中选择
    * @param {Object} data（可选参数）任务附带参数
    */
    runTask: function(tid, data) {
        if(this.tasks[tid]) {

            var _this = this;

            this.tasks[tid].forEach(function(task) {
                _this.curTask = task;
                return task.begin(data);
            });

        }
    },

    /**
    * 执行一个队列的任务
    */
    runByQueue: function() {
        var tid = this.queue.shift();

        if(typeof tid == 'number') {
            this.runTask(tid);
        }else {
            this.runTask(tid.id, tid.data);
        }

        this.queue.length && this.runByQueue();
    },

    /**
    * 开始执行任务
    * @param {Array} queue（可选参数）一个任务队列
    */
    start: function(queue) {
        if(this.hasStart) {
            return;
        }

        this.hasStart = true;

        var _this = this;

        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        process.stdin.on('data', function (text) {
            text = text.replace(/\s*/g,'');

            emitter.emit('receive_data', _this.curTask, text);
        });

        emitter.on('receive_data', function(task, text) {
            task.receive(text);
        });

        if(queue) {
            this.queue = queue;
            this.runByQueue();

        }else if(process.argv[2] == '-c'){
            this.runTask(STEP.BEGIN);

        }else {
            this.runTask(STEP.GRUNT_TASK);
        }
    },

    end: function() {
        // log(task_config);
        process.exit();
    },

    /**
    * 创建配置文件
    * @param {Function} callback 任务的回调 
    */
    createConfigFiles: function(callback) {
        var node_path = path.normalize(path.join(task_config.nodePath, 'node_modules'));

        try {
            task_config.nodePath = node_path;
            task_config.assetPath = path.normalize(task_config.assetPath);
            task_config.pagePath = path.normalize(task_config.pagePath);

            fs.writeFileSync('./myconfig.json', JSON.stringify(task_config));
        }catch(err) {
            throw err;
        }

        callback && callback();
    }

};

/**
* 任务类
* @return {Object Task}
* @param {Object} opt 任务的配置，会成为任务实例的属性
*   opt.id 任务id
*   opt.type 任务类别 从TASK_TYPE中选择
*   opt.prompt 任务提示文本
*   opt.success type为Y_OR_N特有，回答y时的回调
*   opt.refuse type为Y_OR_N特有，回答n时的回调
*   opt.input type为INPUT特有，用户输入的回调
*   opt.options type为CHOOSE特有，各个选项的值
*   opt.choose type为CHOOSE特有，用户输入的回调
*   opt.when when为DEFERRED特有, 等待结果时的函数
*   opt.done done为DEFERRED特有，结果完成时的函数
*/
var Task = function(opt) {
    this.id = opt.id;
    this.type = opt.type;
    this.prompt = opt.prompt;

    this.config = opt;
};

Task.prototype = {
    /**
    * 监听到用户的输入行为，然后分钟处理
    * @param {Object} data 一般是用户输入的数据
    */
    receive: function(data) {
        switch(this.type) {
            case TASK_TYPE.Y_OR_N: {

                data = data.toUpperCase();

                if(data == 'Y') {
                    this.config.accept.call(this, taskManager);
                }else if(data == 'N') {
                    this.config.refuse.call(this, taskManager);
                }else {
                    log('别卖萌了', LOG.FUN);
                    this.begin();
                }

                break;
            }

            case TASK_TYPE.INPUT: {
                this.config.input.call(this, taskManager, data);
                break;
            }

            case TASK_TYPE.CHOOSE: {
                this.config.choose.call(this, taskManager, this.config.options[data-1]);
                break;
            }

            case TASK_TYPE.DEFERRED: {
                var eid = 'deferred_event_'+Date.now();

                emitter.on(eid, this.config.done);
                this.config.when.call(this, taskManager, eid);
                break;
            }
        }
    },

    /**
    * 任务开始
    */
    begin: function(data) {
        if(this.prompt) {
            log('\n'+this.prompt, LOG.EM);
        }else {
            process.stdin.emit('data', EMPTY_DATA);
        }

        if(this.config.tips) {
            log('tips: '+this.config.tips, LOG.TIPS);
        }
    }
}


taskManager
//开始构建
.register(STEP.BEGIN, {
    type: TASK_TYPE.Y_OR_N,
    prompt: '是否构建项目？(Y/N)',
    tips: 'Y进入构建步骤，N如果已经生成myconfig.json或者想手动设置，可以跳过设置直接跑grunt任务',
    accept: function(manager) {
        task_config.create = true;
        manager.runTask(STEP.ASSETS_PATH);
    },
    refuse: function(manager) {
        task_config.create = false;
        manager.runTask(STEP.GRUNT_TASK);
    }
})

//指定静态资源路径
.register(STEP.ASSETS_PATH, {
    type: TASK_TYPE.INPUT,
    prompt: '请输入上线静态资源路径:',
    tips: '如：d:/output/assets，可以先不指定，直接回车',
    input: function(manager, data) {
        task_config.assetPath = data || 'output_assets';
        manager.runTask(STEP.PAGE_PATH);
    }
})

//指定静态资源路径
.register(STEP.PAGE_PATH, {
    type: TASK_TYPE.INPUT,
    prompt: '请输入上线模块文件路径:',
    tips: '如：d:/www，可以先不指定，直接回车',
    input: function(manager, data) {
        task_config.pagePath = data || 'output';
        manager.runTask(STEP.NODE_PATH);
    }
})

//指定node_module
.register(STEP.NODE_PATH, {
    type: TASK_TYPE.INPUT,
    prompt: '请输入node_modules路径:',
    tips: '指定到node_modules的父目录，例如 d:/nodejs/',
    input: function(manager, data) {
        task_config.nodePath = data;
        manager.runTask(STEP.PORT);
    }
})

//指定端口号
.register(STEP.PORT, {
    type: TASK_TYPE.INPUT,
    prompt: '请输入默认端口号:',
    input: function(manager, data) {
        task_config.port = data;
        manager.runTask(STEP.APP_NAME);
    }
})

//指定应用
.register(STEP.APP_NAME, {
    type: TASK_TYPE.INPUT,
    prompt: '请输入应用名:',
    tips: '例如 user,school 多个项目用逗号分隔，不指定为全部项目',
    input: function(manager, data) {
        task_config.app = data || '';
        manager.runTask(STEP.CONFIG);
    }
})

//生成myconfig.json
.register(STEP.CONFIG, {
    type: TASK_TYPE.DEFERRED,
    when: function(manager, event) {
        log('\n正在生成配置文件...', LOG.GOOD);

        manager.createConfigFiles(function() {
            emitter.emit(event, manager);
        });
    },
    done: function(manager) {
        log('\n配置文件创建成功', LOG.GOOD);
        log('\n恭喜！项目构建完成!!', LOG.WARN);
        manager.runTask(STEP.GRUNT_TASK);
    }
})

//开始构建
.register(STEP.GRUNT_TASK, {
    type: TASK_TYPE.CHOOSE,
    prompt: '请指定要执行的任务类型：\n1. dev\n2. production',
    tips: '类型1是本地开发任务，类型2是上线任务。本地开发时请把服务的根目录指到当前生成的public目录，静态资源自行配置',
    options: ['dev', 'production'],
    choose: function(manager, data) {

        if(!task_config.create) {
            task_config = require('./myconfig.json');
        }

        if(!task_config) {
            log('\n找不到配置文件，需要重新构建', LOG.WARN);
            manager.end();

        }else {

            var cli = require(path.join(task_config.nodePath,'grunt')).cli;
            cli.tasks = ['server:'+data];
            cli();
        }
    }
});

taskManager.start();

