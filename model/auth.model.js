const mongooose = require("mongoose");
const bcrypt = require('bcrypt');
const userSchema = new mongooose.Schema({
    username: {
        type : String,
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
    }
})


// pre-hook function to encrypt password before saving to the database
userSchema.pre('save', async function(next) {
    const hashPassword = await bcrypt.hash(this.password, 10)
    this.password = hashPassword;
    next()
})


const userModel = mongooose.model("User", userSchema);
module.exports = userModel;