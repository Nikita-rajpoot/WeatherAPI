// const apiKey = "b5f6289422f6fec963e07a71ec1dcb7c"// openWeatherAPi key
// const getWeatherBtn =document.getElementById("get-weather-btn")
// const cityInput = document.getElementById("city-input");
// const weatherInfo =document.getElementById("weather-info");
// const forecastInfo = document.getElementById("forecast-info");
// const forecastList =document.getElementById("forecast-list");
// const cityName = document.getElementById("city-name");
// const temperature =document.getElementById("temperature");
// const humidity = document.getElementById("humidity");
// const description =document.getElementById("description");

// getWeatherBtn.addEventListener("click", getWeather)

// function getWeather(){
//     const city = cityInput.value.trim();

//     if(city === ""){
//         alert("Please enter your city name................")
//         return;
//     }

//     fetchWeatherData(city);
// }

// function fetchWeatherData(city){
//     const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//     const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

//     // fetch current weather data 
//     fetch(currentWeatherUrl)
//     .then((response)=> response.json())
//     .then((data)=>{
//           cityName.textContent = `Weather in ${data.name}`;
//           temperature.textContent = `Temperature in ${data.main.temp}°C`;
//         humidity.textContent = `Humidity in ${data.main.humidity}%` ;
//         description.textContent = `Description : ${data.weather[0].description}`;


//         // fetch 5 day forecast data 
//         fetch(forecastUrl)
//         .then((response)=> response.json())
//         .then((forecastData)=>{
//             displayForecast(forecastData);
//         })
//     })
//     .catch((error)=>{
//         alert("Error fetching weather data")
//     })
// }

// function displayForecast(forecastData){
//     forecastList.innerHTML = ""

//     // data is in 3 hour intervals , so 8 times gives a fullday
//     for(let i=0;i<forecastData.list.length;i+=8){
//         const dayForecast = forecastData.list[i];
//         const listItem = document.createElement("li")
//         listItem.textContent = `${new Date(dayForecast.dt * 1000).toLocaleDateString()} - Temp : ${dayForecast.main.temp}°C- ${dayForecast.weather[0].description}`

//         forecastList.appendChild(listItem);
//     }
// }



const getWeatherBtn = document.getElementById("get-weather-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const forecastInfo = document.getElementById("forecast-info");
const forecastList = document.getElementById("forecast-list");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const description = document.getElementById("description");

getWeatherBtn.addEventListener("click", getWeather);

function getWeather() {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter your city name...");
        return;
    }

    fetchWeatherData(city);
}

function fetchWeatherData(city) {
    fetch(`/api/weather?city=${city}`)
        .then(response => response.json())
        .then((data) => {
            cityName.textContent = `Weather in ${data.weather.name}`;
            temperature.textContent = `Temperature: ${data.weather.main.temp}°C`;
            humidity.textContent = `Humidity: ${data.weather.main.humidity}%`;
            description.textContent = `Description: ${data.weather.weather[0].description}`;

            displayForecast(data.forecast);
        })
        .catch(() => {
            alert("Error fetching weather data");
        });
}

function displayForecast(forecastData) {
    forecastList.innerHTML = "";

    for (let i = 0; i < forecastData.list.length; i += 8) {
        const dayForecast = forecastData.list[i];
        const listItem = document.createElement("li");
        listItem.textContent = `${new Date(dayForecast.dt * 1000).toLocaleDateString()} - Temp: ${dayForecast.main.temp}°C - ${dayForecast.weather[0].description}`;

        forecastList.appendChild(listItem);
    }
}
