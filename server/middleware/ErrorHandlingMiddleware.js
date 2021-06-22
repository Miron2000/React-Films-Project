const ApiError = require('../error/ApiError');

module.exports = function (err, req, res, next) {
    if(err instanceof ApiError) {
       return res.status(err.status).json({message: err.message})
    }
    if (process.env.NODE_ENV === "development") {
        return res.status(500).json({message: err.message})
    } else if (process.env.NODE_ENV === "production") {
        return res.status(500).json({message: 'Unexpected error'})
    }

}