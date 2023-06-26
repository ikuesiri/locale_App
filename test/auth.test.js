const request = require("supertest")
const app = require("../app")
const { MongoMemoryServer }  = require("mongodb-memory-server")
const mongoose = require('mongoose')


//registeration payload
const userPayload = {
    "username": "test1",
    "email": "test1@xyz.com",
    "password": "1234567"
}

//signin payload 
const signInPayload = {
    "email": "test1@xyz.com",
    "password": "1234567"
}

/* Connecting to the database before each test. */
beforeAll( async() =>{
    const mongod =  await MongoMemoryServer.create()
    await mongoose.connect(mongod.getUri())
})

afterAll( async() =>{
    await mongoose.connection.close();
    await mongoose.disconnect()
  })


describe("User Authentication", () =>{
    describe("New User registers enters details and application saves in the database", () =>{
        it("should return an Api Key for the registered user", async()=>{
            const {body, statusCode} = await request(app)
            .post("/api/v1/auth/register")
            .send(userPayload);

            expect(statusCode).toBe(201)
            expect(body).toHaveProperty('message', 'Registration completed!!!, Make sure you keep your API KEY Safe!')
            expect(body).toHaveProperty('user')
            expect(body.user).toHaveProperty('id')
            expect(body.user).toHaveProperty('username', 'test1')
            expect(body.user).toHaveProperty('email', 'test1@xyz.com')
            expect(body.user).toHaveProperty('apiKey')
        });

    });
   
    // SIGN IN
    describe("Signs in an Existing User", ()=>{
        it('should signIn an existing user, when they provide their valid email and password', async()=>{
            const {body, statusCode} = await request(app)
            .post("/api/v1/auth/login")
            .send(signInPayload);

            expect(statusCode).toBe(200)
            expect(body).toHaveProperty("success", true)
            expect(body).toHaveProperty("message", "login Successful")
        });
  })
});
