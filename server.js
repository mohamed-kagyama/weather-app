const path = require("path");
const express = require('express');
const hbs = require("hbs");
const app = express();
const {geoCode,forcast} = require('./utils');

app.set('view engine','hbs')
app.set('views',path.join(__dirname,"templates"))
hbs.registerPartials(path.join(__dirname,"templates/partials"))

// static folder
app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res,next)=>{
    res.render("index",{
        name:"naruto uzumaki"
    })
})

app.get("/weather",(req,res,next)=>{
    const address = req.query.address;
    if(!address){
        return res.status(200).json({
            error:"Please provide a valid location"
        })
    }
    else{
        geoCode(address,(error,data)=>{
            if(error){
                return res.status(200).json({
                    error
                })
            }
            forcast(data.latitude,data.longitude,(error,forcastData)=>{
                if (error) {
                    return res.status(200).json({
                        error
                    })
                }
                return res.status(200).json({
                    loacation:data.loacation,
                    temperature : forcastData.current.temperature,
                    feelsLike : forcastData.current.feelslike

                })
             })
        })
    }
})


app.use("*",(req,res,next)=>{
    res.render("404")
})

app.listen(process.env.PORT,()=>{
    console.log("server is listening on port 3000");
})




