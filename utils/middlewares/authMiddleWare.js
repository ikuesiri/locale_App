const User = require("../../model/auth.model");
const asyncHandler = require("../middlewares/AsyncHandler");


const validateApiKey = asyncHandler( async(req, res, next) =>{
    // const apiKey = req.query.apiKey
    const authHeader = req.headers.authorization;
    if(!authHeader  ||  ! authHeader.startsWith('Bearer ')){
        throw new Error('Invalid Authentication')
    }

    const apiKey = authHeader.split(" ")[1]
    // try {
        // if(!apiKey){
        //     return res.status(401).json({errorMessage: `You're Unauthorized! Kindly add your "apiKey" as a query`})
        // }
        const validate =  await User.findOne({apiKey});
        if(!validate){
            return res.status(401).json({errorMessage: `Invalid Api Key!`})
        }
        next()
    
    // } catch (error) {
    //     console.error(error)
    // }
    
})

module.exports = validateApiKey;



// const authenticate = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if(!authHeader  ||  ! authHeader.startsWith('Bearer ')){
//         throw new Error('Invalid Authentication')
//     }
    
