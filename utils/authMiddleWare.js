const jwt = require('jsonwebtoken');
const CONFIG = require("../CONFIG/env.config");


const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader  ||  ! authHeader.startsWith('Bearer ')){
        throw new Error('Invalid Authentication')
    }


    const token = authHeader.split(" ")[1];
    // console.log(token)

    try {
        const payload = jwt.verify(token, CONFIG.jwt_secret)

        //useful when attaching the user[author] to the protected articles route
        req.user = {userID : payload.userID, email : payload.email, username : payload.username}
        next()

    } catch (error) {
        throw new Error('Invalid Authentication')

    }
}

module.exports = authenticate

