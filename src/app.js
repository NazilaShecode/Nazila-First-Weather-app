function formatDate(timestamo){
    let date = new Date(timestamo);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}


function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun","Mon","Tue","Tue","Wed","Thu","Fri","Sat"];
    
    return days[day];
}


function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    
    forecast.forEach(function(forecastDay, index) {
        if (index < 6) {
            forecastHTML += `
            <div class="col-2">
                <div class="weather-forcast-date">${formatDay(forecastDay.dt)}</div>
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="40"/>
                <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max">
                        ${Math.round(forecastDay.temp.max)}°
                    </span>
                    <span class="wearher-forecast-temperature-min">
                        ${Math.round(forecastDay.temp.min)}° 
                    </span>
                </div>
            </div>`;
        }
    });
        
    forecastHTML = forecastHTML + `<div>`; 
    forecastElement.innerHTML = forecastHTML;
}
    
function getForecast(coordinates) {
    let apiKey = "5569faf92417631e8d5bf083852d65c1";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemprature(response) {

    console.log(response.data);
    console.log(response.data.weather[0]);

    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind")
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000)
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);

}


    function searchDefault(city) {
        let apiKey = "5569faf92417631e8d5bf083852d65c1";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayTemprature);
    }

    function subCity(event) {
        event.preventDefault();
        let cityInputElement = document.querySelector("#city-input");
        searchDefault(cityInputElement.value);
    }
    

    let form = document.querySelector("#search-form");
    form.addEventListener("submit", subCity);

    searchDefault("Yazd");
    displayForcast();