const axios = require("axios");
require("dotenv").config();

const geoCode = async (address,callback) => {
    try {
        const response = await axios.get(`${process.env.GEO_API_URL}${encodeURIComponent(address)}.json`,{
            params:{
                access_token : process.env.GEO_ACCESS_KEY,
                limit : 1
            }
        })
        if(!response.data.features.length){
            console.log(response);
            callback("Unable to find the location,try again with another one",undefined)
        }
        else{
            callback(undefined,{
                latitude:response.data.features[0].center[1],
                longitude:response.data.features[0].center[0],
                location:response.data.features[0].place_name
            })
        }
    } catch (error) {
        console.log(error);
        callback("Unable to connect to the location service",undefined)
    }
    
}

const forcast = async (latitude,longitude,callback)=>{
    try {
        const response = await axios.get(`${process.env.WEATHER_API_URL}`,{
            params:{
                access_key : process.env.WEATHER_ACCESS_KEY,
                query : `${latitude},${longitude}`
            }
        })
        if(response.data.error){
            callback("unable to find the location",undefined)
        }
        else{
            callback(undefined,response.data)
        }
    } catch (error) {
        console.log(error);
        callback("Unable to connect to the weather service",undefined)
    }
}

module.exports = {
    geoCode,
    forcast
}