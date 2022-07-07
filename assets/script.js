//connect API
//fetch API data: city, date, temp, wind, humidity, uv index, 5-day forecast of temp,wind,humidity, weather emoji

var APIKey = "3d8192d986e0f88e98e2fa4d8b729817";
var city = "Tacoma";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
var date = document.getElementById('date');
// var currentDate = moment().format("YYYY");
var searchButton = document.getElementById('search-btn');
var cityInput = document.querySelector('.search-input');
// console.log(currentDate);
// var lat;
// var long;

//add event listener for search click
searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    var searchInput = cityInput.value;
    localStorage.setItem("city", searchInput);
})

fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
        //fetch city name from search
        var cityTempEl = document.getElementById('current-city-date');
        cityTempEl.textContent = data.name;
        //fetch current temperature, create, and append element
        var currentTemp = document.createElement('span');
        currentTemp.textContent = data.main.temp + "\u00B0";
        document.getElementById("current-temp").appendChild(currentTemp);
        //fetch current wind, create, and append element
        var currentWind = document.createElement('span');
        currentWind.textContent = data.wind.speed + "MPH";
        document.getElementById("current-wind").appendChild(currentWind);
        //fetch current humidity, create, and append element
        var currentHumidity = document.createElement('span');
        currentHumidity.textContent = data.main.humidity + "%";
        document.getElementById('current-humidity').appendChild(currentHumidity);
        var lat = data.coord.lat;
        var long = data.coord.lon;
        var latLonURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + APIKey;
        // var latLon = [lat, long];
        return fetch(latLonURL)
    })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // console.log(data);
                //fetch current UV index, create, and append element
                var currentUV = document.createElement('span');
                currentUV.textContent = data.current.uvi;
                document.getElementById('current-uv').appendChild(currentUV);
                //fetch current weather icon, create, and append element
                var currentWeatherIcon = document.createElement('img');
                currentWeatherIcon.setAttribute("src", data.current.weather[0].icon);
                document.getElementById('current-city-date').appendChild(currentWeatherIcon);
            })
    
fetch(forecastURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
    
