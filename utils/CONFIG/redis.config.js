const { createClient } = require('redis')
const CONFIG = require("./env.config")

class Cache{
    constructor() {
        this.redis = null
    }
    async connect(){
        try {
             this.redis = await createClient({
               url : CONFIG.redis_url             
             });
             this.redis.connect()
             this.redis.on("connect", ()=> console.log('redis connected'))
             this.redis.on('error', (err) => console.log('Redis Client Error', err));

        } catch (error) {
            console.error(error)
        }
    }
}


const cacheInstance = new Cache();
module.exports = cacheInstance;

