const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require('express-rate-limit');
const app = express();
const CONFIG = require("./CONFIG/env.config"); //environment variables
const connectDB = require("./CONFIG/db.config");
const authRouter = require("./routes/auth.route");
const router = require("./routes/nigeriaData.route");


// Middleware for rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // maximum 100 requests per windowMs
    message: 'Too many requests, please try again later.',
  });

    // Apply rate limiter to all requests
    app.use(limiter);
  
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true}))

//middleware to grab post/patch requests as json files or other files
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//
const NaijaData = require("./model/naija.model")

//Read Json data
const data = require("./nigeria-states-and-local-govts/r-s-l.json", "utf8");

//Parse to json
// const nigeriaData =  JSON.parse(data);
// saving the data to MongoDB atlas

//upload region data
app.post("/upload", (req, res) =>{
   NaijaData.insertMany(data.geopolitical_regions)
   .then((data)=>{
   console.log("Region Data Uploaded")
   })
   .catch( error =>{
    console.error(error)
   })
})


app.delete("/delete",  (req, res) =>{
    NaijaData.deleteMany()
.then((data) =>{
    console.log("Data Successfully deleted")
    // mongoose.disconnect();
    
})
.catch( error =>{
    console.error('Error saving data:', error)
    // mongoose.disconnect();
})
})






//get lga
app.get("/test" , async( req, res) =>{
       const stateName = req.query.stateName;
    try {
        const nigeriaData = await NaijaData.find({});
         if(!nigeriaData){
            return res.status(404).json({ message : "file not found!"});
         }
         const states = []
         let statesResult = []
         for(let i =0; i < nigeriaData.length; i++){
             states.push(nigeriaData[i].states.map((state) =>{
                return {
                    state : state.name,
                    lgas : state.lgas,
                    metadata : state.metadata
                      }
                }               
            ));                    
        }                   
        if(states){
            statesResult = states.flat();
        }
    for(let i = 0; i < statesResult.length; i++){
         if( statesResult[i].state == stateName ){
            return res.status(200).json(statesResult[i]);
         }

    }     

    }
    catch (error) {
        console.error({error : error.message});
    }

})




//2]  Query Regions ONLY
//3a]  Query State ONLY
//3b]  Query State and ONLY



app.get("/", (req, res) => {
    res.send({
        success: true,
        message: " Welcome to KIK Locale service"
    })
});


//app middleware to the user registration & login routes
app.use("/api/v1/auth", authRouter);

//route path middleware
app.use("/api/v1/search", router);

// app.use("/api/v1/search", mapRouter);


app.all( "*", (req, res) =>{
    res.status(404).send({
        errorMessage: `Invalid Page`
    });
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
        const conn = await connectDB(CONFIG.mongo_uri);
        console.log(`connect db @ ${conn.connection.host}`)
        app.listen( CONFIG.port, () => console.log(`Server listening at http://localhost:${CONFIG.port}`))
    } catch (error) {
        console.error({
            message: error.message
        })
        
    }
} 

//initialize connection
start();