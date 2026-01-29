const apikey = "c36088b24a659b7e3468118225558c82";
;

async function get_response(city){
     try{
        const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apikey}`;


    const response  = await fetch(api_url);
    return await response.json();
    }
    catch(error){
        window.prompt(error)
    }
}


async function getweather(){// on click
    try{
    var city_name = document.getElementById("input").value.trim();
    var city =  city_name.charAt(0).toUpperCase() + city_name.slice(1).toLowerCase() 
    if(city==""){
        document.getElementById("bt").style.display = "none";
        document.getElementById("def").style.display ="flex";
        document.getElementById("def").style.width ="80vh";
        document.getElementById("heading").textContent ="Please enter city name to get weather"
        throw new Error ("Please enter city name to get weather")
        
    }      

    else {document.getElementById("def").style.display ="none";
    document.getElementById("bt").style.display ="block";}
    
    const weather_data = await get_response(city)
    if (weather_data.cod !== 200) {

        document.getElementById("def").style.display ="flex";
        document.getElementById("bt").style.display = "none";
        document.getElementById("def").style.width ="70vh";
        document.getElementById("heading").textContent ="Please enter a valid city name";
        throw new Error("Please enter a valid city name");
    }
    document.getElementById("city").textContent = city
    const temp =  weather_data.main.temp + "°C"
    document.getElementById("temp").textContent = temp
    const humidity = weather_data.main.humidity 
    document.getElementById("humidity").textContent = "Humidity: "+humidity +"%"
    const description = weather_data.weather[0].description
    document.getElementById("description").textContent = description
    const id =  weather_data.weather[0].id
    const emoji = getWeatherEmoji(id);
    document.getElementById("image").textContent = emoji

    
    } 
    catch(error){
        console.log(error)
    }
  
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      return "🌦️";

    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "🌫️";
    case weatherId === 800:
      return "☀️";
    case weatherId > 800 && weatherId < 810:
      return "☁️";
    default:
      return "❓";
  }
}

