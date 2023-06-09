const NaijaData = require("../model/naija.model");
const Cache = require("../CONFIG/redis.config");
const CONFIG = require("../CONFIG/env.config");

//function to get full Json file of Nigeria regions, states,lgas and metadata
const getData =  async( req, res) =>{
    try{
        
         const nigeriaData = await NaijaData.find({});
         if(!nigeriaData){
            return res.status(404).json({ message : "file not found!"});
         }   
           //set cache
           const  cacheKey = req.originalUrl.toLowerCase();
            Cache.redis.SETEX(cacheKey, 3600, JSON.stringify(nigeriaData));
            res.status(200).json({nigeriaData})
    } 
    catch (error) {
            console.error({error : error.message});
    }
}

//function to get  Nigeria regions ONLY

const getRegions = async(req, res) =>{
    try {
        const nigeriaData = await NaijaData.find({});
         if(!nigeriaData){
            return res.status(404).json({ message : "file not found!"});
         }
         const region = nigeriaData.map((region) => region.name);
         //set cache
         const  cacheKey = req.originalUrl.toLowerCase();
         Cache.redis.SETEX(cacheKey, 3600, JSON.stringify(region));
         res.status(200).json(region);

    }
    catch (error) {
        console.error({error : error.message});
    }
}

//function to get  Nigeria States ONLY

const getStates = async(req, res) =>{
    try {
        const nigeriaData = await NaijaData.find({});
         if(!nigeriaData){
            return res.status(404).json({ message : "file not found!"});
         }
         const states = []
         let statesResult = []
         for(let i =0; i < nigeriaData.length; i++){
             states.push(nigeriaData[i].states.map((state) => state.name));           
            }         
            if(states){          
              statesResult = states.flat();
          }
           //set cache
         const  cacheKey = req.originalUrl.toLowerCase();
         Cache.redis.SETEX(cacheKey, 3600, JSON.stringify(statesResult));
         res.status(200).json(statesResult);
    }
    catch (error) {
        console.error({error : error.message});
    }
}


//function to get  Nigeria Regions and corresponding States ONLY

const getRegionState =  async(req, res) => {
    try {
         const nigeriaData = await NaijaData.find({});
         if(!nigeriaData){
            return res.status(404).json({ message : "file not found!"});
         }
        const regionState = nigeriaData.map((region =>{
            return{
              regions: region.name,
              states: region.states.map((state)=> state.name
  
              )
            }
        }))
        //set cache
        const  cacheKey = req.originalUrl.toLowerCase();
        Cache.redis.SETEX(cacheKey, 3600, JSON.stringify(regionState));

        res.status(200).json(regionState)
     } catch (error) {
      console.error(error)
     }
}

//function to get  Nigeria Sates and corresponding Locat govt. areas ONLY
const getStateLga =  async( req, res) =>{
    try {
         const nigeriaData = await NaijaData.find({});
         if(!nigeriaData){
            return res.status(404).json({ message : "file not found!"});
         }
            let stateLga = [];
        for( let i = 0; i < nigeriaData.length; i++){

           stateLga.push( nigeriaData[i].states.map((state)=>{
              return {
                states : state.name,
                lgas : state.lgas
              }  
            }))
        }
        //set cache
        const  cacheKey = req.originalUrl.toLowerCase();
        Cache.redis.SETEX(cacheKey, 3600, JSON.stringify(stateLga));

        res.status(200).json(stateLga);
        
      } catch (error) {
        console.error(error);
      }
}

//function to get  Nigeria Sates and corresponding Locat govt. areas ONLY
const getStateMetadata =  async( req, res) =>{
    try {
         const nigeriaData = await NaijaData.find({});
         if(!nigeriaData){
            return res.status(404).json({ message : "file not found!"});
         }
            let stateMetadata = [];
        for( let i = 0; i < nigeriaData.length; i++){

           stateMetadata.push( nigeriaData[i].states.map((state)=>{
              return {
                states : state.name,
                metadata : state.metadata
              }  
            }))
        }
        //set cache
        const  cacheKey = req.originalUrl.toLowerCase();
        Cache.redis.SETEX(cacheKey, 3600, JSON.stringify(stateMetadata));

        res.status(200).json(stateMetadata);
        
      } catch (error) {
        console.error(error);
      }
}

//-----------Query for One Value------------

//Query for a Region
const getOneRegion = async( req, res) =>{
    const  regionName = req.params.regionName;
    
    if(!regionName){
        res.status(400).json({message: `Invalid Input`})
    }
   try {
      const data = await NaijaData.findOne({name : regionName})
      if(!data){
        return res.status(404).json({message : `file Not found!`})
      }
      //set cache
      const  cacheKey = req.originalUrl.toLowerCase();
      Cache.redis.SETEX(cacheKey, 3600, JSON.stringify(data));

        res.status(200).json(data);
   } catch (error) {
    console.error(error)
   }

}


//Query for a State
const getOneState = async( req, res) =>{
    const stateName = req.params.stateName;
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
        
        const data = statesResult[i]

        //set cache
        const  cacheKey = req.originalUrl.toLowerCase();
        Cache.redis.SETEX(cacheKey, 3600, JSON.stringify(data));
         return res.status(200).json(statesResult[i]);
      }
    }     
    return res.status(404).json({messsage: 'InCorrect Entry! Please try Again'})
}
 catch (error) {
     console.error({error : error.message});
 }

}



module.exports = {
    getData,
    getRegions,
    getStates,
    getRegionState,
    getStateLga,
    getStateMetadata,
    getOneRegion,
    getOneState
}