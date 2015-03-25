//var log = require('../lib/log.js').logger('/lib/user.js');
module.exports = function(req, res, next){
    console.log(req.session);
    var user = req.session.user;
    if(!user){
        next();
        return;
    }
    req.user = res.locals.user =user;
    next();
};
