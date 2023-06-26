const  express = require("express")
const  swaggerJsdoc = require("swagger-jsdoc")
const  swaggerUi = require('swagger-ui-express')
const  bodyParser = require("body-parser")
const  cors = require("cors")
const  authRouter = require ("./routes/auth.route.js")
const  router = require ("./routes/nigeriaData.route.js")
const  rateLimiter = require ("./utils/middlewares/rateLimiter.js")
const  err404 = require ("./utils/error/404.error.js")
const  globalErrorhandler = require ("./utils/error/globalError.js")
const app = express();




//global middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(rateLimiter);

const options = {
    definition:{
        openapi: '3.1.0',
        info: {
            title: 'Locale API with swagger',
            version: '1.0.0',
            description: "get geographical data of Nigeria",
        },
        contact: {
            name: "Onosemuode Ikuesiri Kola",
            url: "",
            email: "ikuesiri.onosemuode@gmail.com"
        },
        servers: [
            {
                url: "http://localhost:3000"
                // url: `http://localhost:${CONFIG.port}`
            }
        ],
    },
    apis: ["./routes/*.js"]
};

const specs = swaggerJsdoc(options)

app.use(
    '/api-docs',
    swaggerUi.serve,
swaggerUi.setup(specs, { explorer: true}) 
    );
// app.get('/docs.json', (req, res) => {
//         res.setHeader('Content-Type', 'application/json')
//         res.send(swaggerSpec)
// })



app.get("/", (req, res) => {
    res.send({
        success: true,
        message: " Welcome to NIG Locale service"
    })
});

//app middleware to the user registration & login routes
app.use("/api/v1/auth", authRouter);
//route path middleware
app.use("/api/v1/search", router);


//404 handler
app.all( "*", err404)
//global error handler
app.use(globalErrorhandler)


module.exports = app;