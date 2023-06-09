const app =require("./app")
const cacheInstance =require("./utils/CONFIG/redis.config")
const CONFIG  =require("./utils/CONFIG/env.config")
const connectDB  =require("./utils/CONFIG/db.config")


connectDB()
cacheInstance.connect()
app.listen(CONFIG.port, ()=> {
    console.log(`Server listening at http://localhost:${CONFIG.port}`)
})