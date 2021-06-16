function checkAuthenticatedFilmId(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.status(403).json({message: 'Not access'});
}

module.exports = checkAuthenticatedFilmId;