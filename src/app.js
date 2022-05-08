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
    
    function showFarenheit(event) {
        event.preventDefault();
        let temperatureElement = document.querySelector("#temperature");
        celsiusLink.classList.remove("active");
        farenheitLink.classList.add("active");
        let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
        temperatureElement.innerHTML = Math.round(farenheitTemperature);
    }
    function displayCelsiusTemperature(event) {
        event.preventDefault();
        celsiusLink.classList.add("active"); 
        farenheitLink.classList.remove("active");
        let temperatureElement = document.querySelector("#temperature");
        temperatureElement.innerHTML = Math.round(celsiusTemperature);
    }
    let celsiusTemperature = null;

    let form = document.querySelector("#search-form");
    form.addEventListener("submit", subCity);

    let farenheitLink = document.querySelector("#farenheit-link");
    farenheitLink.addEventListener("click", showFarenheit);

    let celsiusLink = document.querySelector("#celsius-link");
    celsiusLink.addEventListener("click", displayCelsiusTemperature);

    searchDefault("Yazd");
