module.exports = function(req, res, next){
    var user = req.session.user;
    if(!user) return next();
    req.user = res.locals.user = user;
    next();
};
