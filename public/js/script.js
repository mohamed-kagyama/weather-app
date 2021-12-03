const inputContainer = document.querySelector("input");
const weatherForm = document.querySelector("form");
const weatherForcast = document.getElementById("weather-forecast");
const errorMessage = document.getElementById("error");

console.log(weatherForcast);
weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const location = inputContainer.value;
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then(response=>{
        return response.json()
    })
    .then(data=>{
        if(data.error){
            errorMessage.innerText = data.error;
        }
        else{
            weatherForcast.innerText = `ìt is currently ${data.temperature} degrees,and it feels like ${data.feelsLike} degrees`
        }
    })
    .catch(err=>{
        console.log(err);
    })
})



