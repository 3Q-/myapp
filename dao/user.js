var models = require('../models');
var User = models.User;

/**
 * 根据用户名列表查找用户列表
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {Array} names 用户名列表
 * @param {Function} callback 回调函数
 */
exports.getUsersByEmails = function (emails, fn) {
  if (names.length === 0) {
    return callback(null, []);
  }
  User.find({ email: { $in: emails } }, fn);
};

/**
 * 根据登录名查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} email 邮箱
 * @param {Function} callback 回调函数
 */
exports.getUserByEmail = function (email, fn) {
  User.findOne({'email': email}, fn);
};

/**
 * 根据用户ID，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} id 用户ID
 * @param {Function} callback 回调函数
 */
exports.getUserById = function (id, fn) {
  User.findOne({_id: id}, fn);
};

/**
 * 根据邮箱，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} email 邮箱地址
 * @param {Function} callback 回调函数
 */
exports.getUserByMail = function (email, fn) {
  User.findOne({email: email}, fn);
};

/**
 * 根据用户ID列表，获取一组用户
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {Array} ids 用户ID列表
 * @param {Function} callback 回调函数
 */
exports.getUsersByIds = function (ids, fn) {
  User.find({'_id': {'$in': ids}}, fn);
};

/**
 * 根据关键字，获取一组用户
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {String} query 关键字
 * @param {Object} opt 选项
 * @param {Function} callback 回调函数
 */
exports.getUsersByQuery = function (query, opt, fn) {
  User.find(query, '', opt, fn);
};

/**
 * 根据查询条件，获取一个用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} name 用户名
 * @param {String} key 激活码
 * @param {Function} callback 回调函数
 */
exports.getUserByNameAndKey = function (loginname, key, fn) {
  User.findOne({loginname: loginname, retrieve_key: key}, fn);
};

exports.save = function (password, email, fn) {
  var user = new User();
  user.password = password;
  user.email = email;
  console.log(user);
  user.save(fn);
};
