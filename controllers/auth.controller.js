const User = require("../model/auth.model");

// Registration
const registerUser = async(req, res, next) => {
    const { username, email, password} = req.body
    if( !username || !email   || ! password){
        res.status(404).send({message: `incomplete details, fill in all your details`})
    }

    try {
          const alreadyExist = await User.findOne({ email});
          if(alreadyExist){
             return res.status(401).send({ errorMessage: "Email already Exist, Please try with a new email"})
          }
         
          const user = new User ({
            username,
            email,
            password
          })
         
          //create token
          const token = user.generateJWT();
         await user.save();
         res.status(201).send({
            success: true,
            message: "Registration completed!!!, Make sure you keep you Save your token",
            user: {
                id:user._id,
                username: user.username,
                email: user.email,
                token
            }

         })
    } catch (error) {
         next( error)
    }

}


//Login

const login = async( req, res, next ) => {
    const { email, password } = req.body;

    if( !email || !password){
        return res.status(401).send({
            success: false,
            errorMessage: `Enter your Email and Password details`
        })
    }
     
    try {
        const user  = await  User.findOne({ email })

        if(!user){
            return res.status(401).send({
                success: false,
                errorMessage: `Invalid Information. Enter a registered email`
            })
        }

        const passwordValidation =  user.isPasswordValid();
        if(!passwordValidation){
            return res.status(401).send({
                success: false,
                errorMessage: `Incorrect password!`
            })
        }

        return res.status(200).send({
            success: true,
            message: "login Successful"
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    registerUser,
    login
}