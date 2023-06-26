const User = require("../../model/auth.model")
const CustomError = require("../error/customError")
const asyncHandler = require("../middlewares/AsyncHandler")


 const validateApiKey = asyncHandler( async(req, res, next) =>{
    // const apiKey = req.query.apiKey
    const authHeader = req.headers.authorization;
    if(!authHeader  ||  ! authHeader.startsWith('Bearer ')){
        // throw new Error('Invalid Authentication')
        const error = new CustomError("Invalid Authentication", 400)
        return next(error)
    }

    const apiKey = authHeader.split(" ")[1]
    // try {
        // if(!apiKey){
        //     return res.status(401).json({errorMessage: `You're Unauthorized! Kindly add your "apiKey" as a query`})
        // }
        const validate =  await User.findOne({apiKey});
        if(!validate){
            // return res.status(401).json({errorMessage: `Invalid Api Key!`})
            const error = new CustomError("Invalid Api Key!", 401)
            return next(error)
        }
        next()

})

module.exports = validateApiKey;
