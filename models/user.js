var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    email:{type:String},
    name:{type:String},
    password:{type:String},
    pic:{type:String},
    salt:{type:String},
    date:{type:Date, default:Date.now},
    birthDay:{type:Date},
    status:{type:Boolean, default:true},
    url: { type: String },
    location: { type: String },
    weibo: { type: String },
    power: { type: Number, default:0 }
});

UserSchema.index({email: 1}, {unique: true});
mongoose.model('User', UserSchema);
