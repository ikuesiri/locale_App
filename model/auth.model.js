const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const CONFIG = require("../CONFIG/env.config");

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required :[ true, "Provide your username"],
        maxlength: [ 12, "Username is Too Long"],
        minlength:[ 1, "Username is too short, please try again"],
      lowercase : true //converts input to lowercase
    },
    email: {
        type: String,
        required: [ true, "Provide your Email"],
      unique: [true, `Email address already taken, please try another`],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email'
      ],
        lowercase : true
    },
    password: {
        type: String,
        required :[ true, "Provide your Password"],
        minlength: [6, 'Password is too short']
    },
    apiKey: {
        type: String
    }
})


// pre-hook function to encrypt password before saving to the database
userSchema.pre('save', async function(next) {
    const hashPassword = await bcrypt.hash(this.password, 10)
    this.password = hashPassword;
    next()
})


// userSchema.methods.generateJWT= function () {
//     return jwt.sign( {userId: this._id, username:this.username, email: this.email},
//         CONFIG.jwt_secret, 
//         {
//             expiresIn : CONFIG.jwt_lifetime || '5h'
//         }
        
//         )
// }


userSchema.methods.isPasswordValid = async function (password){
    return await bcrypt.compare( password, this.password)
}

const User = mongoose.model("User", userSchema);
module.exports = User;