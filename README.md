## Brief description
- Locale is a developer tool (so API) for anyone who needs to know Nigeria, geographically at least.

- Locale’s API shows you all of Nigeria’s regions, 
states, and local government areas(LGAs). 

## AIM
Locale is looking to be a very useful tool for the thousands of businesses building for Nigeria’s 200M+ population size. 

## Tool/Dependencies
- express
- express-rate-limiter
- cross-env
- cors
- mongoose
- redis
- uuid
- body-parser
- body-parser

## Test tools
- jest
- supertest
- mongodb-memory-server

## Requirements
1. All Users should be able to register and generate a one-time aApi Key.
2. All Users should be able to login
3. All Users should be able to gain access to all authenticated endpoint, when they access with their Api Key
4. All Users should be able to search and access endpoints that require Region or State search, using their names of the state or region.


#### User Routes
 - "User Register/SignUp" =POST '/api/v1/auth/register' [generates Api Key]

 - "User login" =POST=  '/api/v1/auth/login'

 ### Locale API Routes
 - "Get all Data"  =GET= '/api/v1/search'
 - "GET all Regions" =GET= '/api/v1/search/regions'
 - "GET all States" =GET= '/api/v1/search/states'
 - "GET all Region[States]" =GET= '/api/v1/search/region-states'

 - "Get all States[LGAs]"  =GET= '/api/v1/search/state-lgas'
 - "GET all states and Additional info" =GET= '/api/v1/search/state-data'
 - "query for a State" =GET= '/api/v1/search/states/<stateName>'
 - "query for a Region" =GET= '/api/v1/search/region/<regionName>'

