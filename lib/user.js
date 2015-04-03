module.exports = function(req, res, next){
    var user = req.session.user;
    if(!user){
        next();
        return;
    }
    req.user = res.locals.user = user;
    next();
};
