const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require('express-rate-limit')
const app = express();

const CONFIG = require("./CONFIG/env.config"); //environment variables
const connectDB = require("./CONFIG/db.config");
const authRouter = require("./routes/auth.route");

// Middleware for rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // maximum 100 requests per windowMs
    message: 'Too many requests, please try again later.',
  });

    // Apply rate limiter to all requests
    app.use(limiter);
  
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended : true}))
// app.set(express.static("public"));
// app.set('view engine', 'ejs');

//middleware to grab post/patch requests as json files or other files
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.get("/", (req, res) => {
    res.send({
        success: true,
        message: " Welcome to KIK Locale service"
    })
});

//app middleware to the user registration & login routes
app.use("/api/v1/auth", authRouter);

app.all( "*", (req, res) =>{
    res.status(404).send({
        errorMessage: `Invalid Page`
    })
    res.redirect("/");
})

//error handler
app.use((error, req, res, next) =>{
    res.status(500).send({
        errorMessage: error.message
    })
})


//server-DB
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