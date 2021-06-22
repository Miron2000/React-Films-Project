function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.status(403).json({message: 'No access'});
}

module.exports = checkAuthenticated;