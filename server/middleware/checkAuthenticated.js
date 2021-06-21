function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.status(403).json({message: 'Not access'});
}

module.exports = checkAuthenticated;