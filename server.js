const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require('express-rate-limit')
const app = express();

const CONFIG = require("./CONFIG/env.config"); //environment variables
const connectDB = require("./CONFIG/db.config");

// Middleware for rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // maximum 100 requests per windowMs
    message: 'Too many requests, please try again later.',
  });
  
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true}))
app.set(express.static("public"));
app.set('view engine', 'ejs');

  // Apply rate limiter to all requests
  app.use(limiter);

app.get("/", (req, res) => {
    res.render('locale');
})


const start = async() =>{
    try {
        await connectDB(CONFIG.mongo_uri);
        await console.log("connect db")
        app.listen( CONFIG.port, () => console.log(`Server listening at http://localhost:${CONFIG.port}`))
    } catch (error) {
        console.error({
            message: error.message
        })
    }
} 

//initialize connection
start();