var APIKey = "3d8192d986e0f88e98e2fa4d8b729817";
var dateDisplayEl = document.querySelector('#today');
var date = moment().format("MMM D YYYY");
var city = '';
var searchButton = document.getElementById('search-btn');
var cityInput = document.querySelector('.search-input');
var currentIcon = document.getElementById('current-icon')

searchButton.onclick = function(event) {
    event.preventDefault();
    getDate();
    runSearch();
    reset();
    clear();
}

$("#cityInput").keypress(function(event){
    if (event.keyCode === 13) {
    event.preventDefault();
    getDate();
    runSearch();
    reset();
    clear();
    }
})

function getDate(){
dateDisplayEl.textContent = date;
}

function reset() {
    var initialValue = "";
    var query = document.getElementById('cityInput');
    query.value = initialValue;
}

function runSearch() {
    searchButton.innerText="New Search";
    let city = document.getElementById("cityInput").value;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
    document.querySelector('.current-search').style.border = "2px solid #000000";
    document.getElementById('forecast').textContent = "5-Day Forecast";
    localStorage.setItem("city", city);
    createButton();

fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
        //fetch city name from search
        var cityTempEl = document.getElementById('current-city');
        cityTempEl.textContent = data.name;
        //fetch current temperature
        var currentTemp = document.getElementById('current-temp');
        currentTemp.textContent = "Temp: " + data.main.temp + "\u00B0";
        //fetch current wind
        var currentWind = document.getElementById('current-wind');
        currentWind.textContent = "Wind: " + data.wind.speed + " MPH";
        //fetch current humidity
        var currentHumidity = document.getElementById('current-humidity');
        currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
        var lat = data.coord.lat;
        var long = data.coord.lon;
        var latLonURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely,hourly&appid=" + APIKey;
        // var latLon = [lat, long];
        return fetch(latLonURL)
    })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // console.log(data);
                //fetch and display current UV index. color change based on uv index rating
                var currentUV = document.getElementById('current-uv');
                currentUV.textContent = "UV Index: " + data.current.uvi;
                if (data.current.uvi < 3.00) {
                    currentUV.style.background = "green";
                    currentUV.style.color = "white";
                } else if (data.current.uvi > 6.00) {
                    currentUV.style.background = "red";
                    currentUV.style.color = "black";
                } else {
                    currentUV.style.background = "yellow";
                    currentUV.style.color = "black";
                }
                //fetch and display current weather icon
                var iconURL = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png";
                console.log(iconURL);
                currentIcon.src = iconURL;
                // document.getElementById('current-city').appendChild(iconURL)
                // placeURL.setAttribute("src", iconURL);
                // currentWeatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png");
            })

// Five day forecast cards with date, temp, wind, humidity
fetch(forecastURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
        //day one date
        document.getElementById('day-one-date').textContent = moment(data.list[4].dt, "X").format("M/D/YY");
        //day one forecast weather icon
        var day1Icon = document.getElementById('day-one-icon');
        day1Icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + ".png");
        // document.getElementById('day-one-icon').appendChild(day1Icon);
        //day one forecast temp
        var day1Temp = document.getElementById('day-one-temp');
        day1Temp.textContent = "Temp: " + data.list[4].main.temp + "\u00B0";
        //day one forecast wind
        var day1Wind = document.getElementById('day-one-wind');
        day1Wind.textContent = "Wind: " + data.list[4].wind.speed + " MPH";
        //day one forecast humidity
        var day1Humidity = document.getElementById('day-one-humidity');
        day1Humidity.textContent = "Humidity: " + data.list[4].main.humidity + "%";
        
        //day two date
        document.getElementById('day-two-date').textContent = moment(data.list[12].dt, "X").format("M/D/YY");
        //day two forecast weather icon
        var day2Icon = document.createElement('img');
        day2Icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[12].weather[0].icon + ".png");
        //day two forecast temp
        var day2Temp = document.getElementById('day-two-temp')
        day2Temp.textContent = "Temp: " + data.list[12].main.temp + "\u00B0";
        //day two forecast wind
        var day2Wind = document.getElementById('day-two-wind');
        day2Wind.textContent = "Wind: " + data.list[12].wind.speed + " MPH";
        //day two forecast humidity
        var day2Humidity = document.getElementById('day-two-humidity');
        day2Humidity.textContent = "Humidity: " + data.list[12].main.humidity + "%";

        //day three date
        document.getElementById('day-three-date').textContent = moment(data.list[20].dt, "X").format("M/D/YY");
        //day three forecast weather icon
        var day3Icon = document.createElement('img');
        day3Icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[20].weather[0].icon + ".png");
        //day three forecast temp
        var day3Temp = document.getElementById('day-three-temp');
        day3Temp.textContent = "Temp: " + data.list[20].main.temp + "\u00B0";
        //day three forecast wind
        var day3Wind = document.getElementById('day-three-wind');
        day3Wind.textContent = "Wind: " + data.list[20].wind.speed + " MPH";
        //day three forecast humidity
        var day3Humidity = document.getElementById('day-three-humidity');
        day3Humidity.textContent = "Humidity: " + data.list[20].main.humidity + "%";

        //day four date
        document.getElementById('day-four-date').textContent = moment(data.list[28].dt, "X").format("M/D/YY");
        //day four forecast weather icon
        var day4Icon = document.createElement('img');
        day4Icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[28].weather[0].icon + ".png");
        //day four forecast temp
        var day4Temp = document.getElementById('day-four-temp');
        day4Temp.textContent = "Temp: " + data.list[28].main.temp + "\u00B0";
        //day four forecast wind
        var day4Wind = document.getElementById('day-four-wind');
        day4Wind.textContent = "Wind: " + data.list[28].wind.speed + "MPH";
        //day four forecast humidity
        var day4Humidity = document.getElementById('day-four-humidity');
        day4Humidity.textContent = "Humidity: " + data.list[28].main.humidity + "%";

        //day five date
        document.getElementById('day-five-date').textContent = moment(data.list[36].dt, "X").format("M/D/YY");
        //day five forecast weather icon
        var day5Icon = document.createElement('img');
        day5Icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[36].weather[0].icon + ".png");
        //day five forecast temp
        var day5Temp = document.getElementById('day-five-temp');
        day5Temp.textContent = "Temp: " + data.list[36].main.temp + "\u00B0";
        //day five forecast wind
        var day5Wind = document.getElementById('day-five-wind');
        day5Wind.textContent = "Wind: " + data.list[36].wind.speed + "MPH";
        //day five forecast humidity
        var day5Humidity = document.getElementById('day-five-humidity');
        day5Humidity.textContent = "Humidity: " + data.list[36].main.humidity + "%";
    })
}

function createButton() {
    let cityHist = window.localStorage.getItem("city");
    console.log(cityHist);
    let cityButton = document.createElement('button');
    cityButton.type = 'button';
    cityButton.textContent = cityHist;
    cityButton.className = "btn btn-primary";
    cityButton.style.width = "200px";
    cityButton.style.height = "30px";
    cityButton.style.color = "white";
    document.getElementById('append').appendChild(cityButton);
    cityButton.onclick = function(event){
        event.preventDefault();
        repeatSearch();
        clear();
        function repeatSearch() {
            let city = cityHist;
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
            document.querySelector('.current-search').style.border = "2px solid #000000";
            document.getElementById('forecast').textContent = "5-Day Forecast";
            localStorage.setItem("city", city);
        
        fetch(queryURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var cityTempEl = document.getElementById('current-city');
                cityTempEl.textContent = data.name;
                var currentTemp = document.getElementById('current-temp');
                currentTemp.textContent = "Temp: " + data.main.temp + "\u00B0";
                var currentWind = document.getElementById('current-wind');
                currentWind.textContent = "Wind: " + data.wind.speed + " MPH";
                var currentHumidity = document.getElementById('current-humidity');
                currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
                var lat = data.coord.lat;
                var long = data.coord.lon;
                var latLonURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely,hourly&appid=" + APIKey;
                return fetch(latLonURL)
            })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        var currentUV = document.getElementById('current-uv');
                        currentUV.textContent = "UV Index: " + data.current.uvi;
                        if (data.current.uvi < 3.00) {
                            currentUV.style.background = "green";
                            currentUV.style.color = "white";
                        } else if (data.current.uvi > 6.00) {
                            currentUV.style.background = "red";
                            currentUV.style.color = "black";
                        } else {
                            currentUV.style.background = "yellow";
                            currentUV.style.color = "black";
                        }
                        var iconURL = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png";
                        console.log(iconURL);
                        var placeURL = document.getElementById('current-icon');
                        placeURL.setAttribute("src", iconURL);
                    })
        fetch(forecastURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                document.getElementById('day-one-date').textContent = moment(data.list[4].dt, "X").format("M/D/YY");
                var day1Icon = document.getElementById('day-one-icon');
                day1Icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + ".png");
                var day1Temp = document.getElementById('day-one-temp');
                day1Temp.textContent = "Temp: " + data.list[4].main.temp + "\u00B0";
                var day1Wind = document.getElementById('day-one-wind');
                day1Wind.textContent = "Wind: " + data.list[4].wind.speed + " MPH";
                var day1Humidity = document.getElementById('day-one-humidity');
                day1Humidity.textContent = "Humidity: " + data.list[4].main.humidity + "%";
                document.getElementById('day-two-date').textContent = moment(data.list[12].dt, "X").format("M/D/YY");
                var day2Icon = document.createElement('img');
                day2Icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[12].weather[0].icon + ".png");
                var day2Temp = document.getElementById('day-two-temp')
                day2Temp.textContent = "Temp: " + data.list[12].main.temp + "\u00B0";
                var day2Wind = document.getElementById('day-two-wind');
                day2Wind.textContent = "Wind: " + data.list[12].wind.speed + " MPH";
                var day2Humidity = document.getElementById('day-two-humidity');
                day2Humidity.textContent = "Humidity: " + data.list[12].main.humidity + "%";
                document.getElementById('day-three-date').textContent = moment(data.list[20].dt, "X").format("M/D/YY");
                var day3Icon = document.createElement('img');
                day3Icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[20].weather[0].icon + ".png");
                var day3Temp = document.getElementById('day-three-temp');
                day3Temp.textContent = "Temp: " + data.list[20].main.temp + "\u00B0";
                var day3Wind = document.getElementById('day-three-wind');
                day3Wind.textContent = "Wind: " + data.list[20].wind.speed + " MPH";
                var day3Humidity = document.getElementById('day-three-humidity');
                day3Humidity.textContent = "Humidity: " + data.list[20].main.humidity + "%";
                document.getElementById('day-four-date').textContent = moment(data.list[28].dt, "X").format("M/D/YY");
                var day4Icon = document.createElement('img');
                day4Icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[28].weather[0].icon + ".png");
                var day4Temp = document.getElementById('day-four-temp');
                day4Temp.textContent = "Temp: " + data.list[28].main.temp + "\u00B0";
                var day4Wind = document.getElementById('day-four-wind');
                day4Wind.textContent = "Wind: " + data.list[28].wind.speed + "MPH";
                var day4Humidity = document.getElementById('day-four-humidity');
                day4Humidity.textContent = "Humidity: " + data.list[28].main.humidity + "%";
                document.getElementById('day-five-date').textContent = moment(data.list[36].dt, "X").format("M/D/YY");
                var day5Icon = document.createElement('img');
                day5Icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[36].weather[0].icon + ".png");
                var day5Temp = document.getElementById('day-five-temp');
                day5Temp.textContent = "Temp: " + data.list[36].main.temp + "\u00B0";
                var day5Wind = document.getElementById('day-five-wind');
                day5Wind.textContent = "Wind: " + data.list[36].wind.speed + "MPH";
                var day5Humidity = document.getElementById('day-five-humidity');
                day5Humidity.textContent = "Humidity: " + data.list[36].main.humidity + "%";
            })
        }
    }
}

function clear() {
    let clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.textContent = "Clear";
    clearBtn.className = "btn btn-danger";
    document.getElementById('forecast').appendChild(clearBtn);
    clearBtn.onclick = function(event) {
        event.preventDefault;
        location.reload();
    }
}