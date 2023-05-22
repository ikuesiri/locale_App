const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require('express-rate-limit')
const app = express();

const CONFIG = require("./CONFIG/env.config") //environment variables

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
const port = 3000
app.listen( port, () => console.log(`Server listening at http://localhost:${port}`))