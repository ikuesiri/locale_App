require("dotenv").config();

const CONFIG = {
    port: process.env.port,
    mongo_uri: process.env.mongo_uri
}

module.exports = CONFIG;