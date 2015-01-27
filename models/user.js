var mongodb = require('./models');
var User = require('models').User;

    //email:{type:String},
    //name:{type:String},
	//age:{type:Number,min:0, max:120},
    //password:{type:String},
    //picPath:{type:String},
	//date:{type:Date, default:Date.now},
    //birthDay:{type:Date},
    //status:{type:boolean, default:true}

//首页

exports.index = function(req, res){
    //无缓存，应尽量避免以这种方式发回文件
    res.sendfile("public\\login.html");
};

//添加用户
exports.addUser = function(req, res) {
    var picPath = req.body.pic;
    if (!picPath || picPath.trim()==="") {
        picPath = "upload/photo.jpg";
    }
    var user = new User({
        name:req.body.name,
        email:req.body.loginCode,
        birthDay:req.body.birthday,
        password:req.body.password,
        picPath:picPath,
        age:req.body.age,
        status:true
    });
    user.save(function(err, u) {
        var result;
        if (err) {
            result = {'code':0,'msg':'添加用户失败：' + err};
            res.json(result);
        }  else {
            result = {'code':1,'msg':'添加用户成功！'};
            res.json(result);
        }
    });
};

//批量删除用户 (uids为id字串，用-拼接，比如：1-3-4-5 )
exports.deleteUsers = function(req, res) {
    User.remove({ _id: { $in: req.params.uids.split("-")}}, function (err) {
        var result;
        if (err) {
            result = {'code':0,'msg':'批量删除用户失败：' + err};
            res.json(result);
        }  else {
            result = {'code':1,'msg':'批量删除用户成功！'};
            res.json(result);
        }
    });
};

//删除用户
exports.deleteUser = function(req, res) {
    User.remove({_id:req.params.uid}, function(err) {
        var result;
        if (err) {
            result = {'code':0,'msg':'删除用户失败：' + err};
            res.json(result);
        }  else {
            result = {'code':1,'msg':'删除用户成功！'};
            res.json(result);
        }
    }) ;
};

//修改用户
exports.modifyUser = function(req, res) {
    console.log("uid:" + req.params.uid);
    User.findById(req.params.uid, function(err, user){
        if (err) {
            commonsFun.handleError(err,"修改用户时查询用户失败！", res);
            return;
        }

        if (user) {
            user.userName = req.body.userName;
            if (req.body.password  && req.body.password !== "***" && req.body.password.trim() !== "") {
                user.password = req.body.password;
            }
            user.birthDay =  req.body.birthday;
            user.picPath = req.body.pic;
            console.log(user);
            user.save(function(err){
                var result;
                if (err) {
                    result = {'code':0,'msg':'修改用户失败：' + err};
                    res.json(result);
                }  else {
                    result = {'code':1,'msg':'修改用户成功！'};
                    res.json(result);
                }
            });
        } else {
            var result = {'code':0,'msg':'要修改的用户可能不存在！'};
            res.json(result);
        }
    });
};

//根据id查询用户
exports.getUserById = function(req, res) {
    var uid =  req.params.uid;
    var result = {'code':0,'msg':'查询用户失败！'};

    User.findById(uid, "_id loginCode userName picPath birthDay" ,function(err, user){
       if (err) {
           commonsFun.handleError(err,"查询用户失败！", res);
           return;
       }
        if (user) {
            result = {'code':1,'data':user};
            res.json(result);
        } else {
            res.json(result);
        }
    });

};

//显示用户分页列表
exports.user_list = function(req, res){
    var pno =  req.params.pno;
    var queryName = req.query.q_name;
    var pageSize = 3;
    var queryParm = {};
    //进行多条件的拼装
    if (queryName && queryName.trim() !== "") {
         //如果用户输入了姓名
        queryParm.userName = new RegExp(queryName);
    }
    User.find(queryParm).count(function(err, userCount){
         if (err) {
             commonsFun.handleError(err, '取用户分页数据失败！' , res);
             return;
         }
         if (userCount > 0 ) {
             //查到了数据
             User.find(queryParm)
                 .limit(pageSize)
                 .skip((pno - 1)*pageSize)
                 .select("_id loginCode userName picPath birthDay")
                 .sort("loginCode")
                 .exec(function(err, users) {
                     if (err) {
                         commonsFun.handleError(err, '取用户分页数据失败！' , res);
                         return;
                     }
                     var p = new Page(pno, pageSize, userCount, users);
                     var result = {'code':1,'page':p};
                     res.json(result);
                 });
         } else {
             //没有查到数据
             var p = new Page(pno, pageSize, 0, []);
             var result = {'code':1,'page':p};
             res.json(result);
         }
    });
};

//得到登录用户状态
exports.getState = function(req, res){
    var user = req.session.user_key;
    var  resultJson ;
    if (user) {
        resultJson = {code:1,name:user.userName};
    }else{
        resultJson =  {code:0,msg:'对不起，您没有登录！'};
    }
    res.json(resultJson);
};

//退出系统（这个方法应该返回json，我这仅仅为演示，直接返回登录页面了）
exports.logout = function(req, res){
    req.session.user_key = null;
    res.redirect("/");
};

//登录系统
exports.login = function(req, res){
    //express中得到参数req.body.uname或req.query.uname，其中，req.body可支持post,delete,put等方式
    console.log("user login, name is:" + req.query.uname + ",pwd is:" + req.query.pwd);

    var loginUser;

    User.findOne({loginCode:req.query.uname},function(err, user) {
        if (err) {commonsFun.handleError(err);}
        if (user && user.password == req.query.pwd) {
            req.session.user_key = user;
            res.send(JSON.stringify({code:1,name:user.userName}));
            return ;
        }
        res.send(JSON.stringify({code:0,msg:'用户名或密码错误，请核对！'}));
    });
};
