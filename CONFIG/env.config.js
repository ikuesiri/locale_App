require("dotenv").config();

const CONFIG = {
    port: process.env.port,
    mongo_uri: process.env.mongo_uri,
    jwt_secret: process.env.jwt_secret,
    jwt_lifetime: process.env.jwt_lifetime,

}

module.exports = CONFIG;