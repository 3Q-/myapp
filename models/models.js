var mongoose = require('mongoose');
var conf = require('../conf');

//连接是如何管理的，是否在这连接，有待深入研究？？？
mongoose.connect(conf.dbUrl);
var Schema  = mongoose.Schema;
//定义对象结构
var userSchema = new Schema({
    email:{type:String},
    name:{type:String},
	age:{type:Number,min:0, max:120}
    password:{type:String},
    picPath:{type:String},
	time:{type:Date, default:Date.now},
    birthDay:{type:Date},
    status:{type:boolean, default:true}
});

//定义集合,其中myUser是数据集的名称
exports.User =  mongoose.model("User", userSchema);
