const  CustomError = require("./customError");

const err404 = (req, res, next) =>{

    const err = new CustomError(`Cannot find ${req.originalUrl} on the server`, 404)
    next(err)
 }

module.exports = err404;
 