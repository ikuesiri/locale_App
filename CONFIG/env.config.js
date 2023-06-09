require("dotenv").config();

const CONFIG = {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    redis_url: process.env.REDIS_URL,
}

module.exports = CONFIG;