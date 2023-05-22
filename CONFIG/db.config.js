const mongooose = require('mongoose');

const connectDB =(url) =>{
    return mongooose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}


module.exports = connectDB;