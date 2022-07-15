
var APIKey = "3d8192d986e0f88e98e2fa4d8b729817";
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
// var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
var dateDisplayEl = document.querySelector('#today');
var date = moment().format("MMM D YYYY");

dateDisplayEl.textContent = date;
var searchButton = document.getElementById('search-btn');
var cityInput = document.querySelector('.search-input');

searchButton.onclick = function(event) {
    event.preventDefault();
    runSearch();
}

$("#cityInput").keypress(function(event){
    if (event.keyCode === 13) {
    event.preventDefault();
    runSearch();
    }
})


function runSearch() {
    searchButton.innerText="New Search";
    let city = document.getElementById("cityInput").value;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
    localStorage.setItem("city", city);

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
        var latLonURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely,hourly&appid=" + APIKey;
        // var latLon = [lat, long];
        return fetch(latLonURL)
    })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // console.log(data);
                //fetch current UV index, create, and append element. color change based on uv index rating
                var currentUV = document.createElement('span');
                currentUV.textContent = data.current.uvi;
                document.getElementById('current-uv').appendChild(currentUV);
                if (currentUV.textContent < 3.00) {
                    currentUV.style.background = "green";
                    currentUV.style.color = "white";
                } else if (currentUV.textContent > 6.00) {
                    currentUV.style.background = "red";
                    currentUV.style.color = "black";
                } else {
                    currentUV.style.background = "yellow";
                    currentUV.style.color = "black";
                }
            
                //fetch current weather icon, create, and append element
                var currentWeatherIcon = document.createElement('img');
                currentWeatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png");
                document.getElementById('current-city-date').appendChild(currentWeatherIcon);
            })
    
fetch(forecastURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
        //day one date
        document.getElementById('day-one-date').textContent = moment(data.list[4].dt, "X").format("M/D/YY");
        //day one forecast weather icon
        var day1Icon = document.createElement('img');
        day1Icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + ".png");
        document.getElementById('day-one-icon').appendChild(day1Icon);
        //day one forecast temp
        var day1Temp = document.createElement('span');
        day1Temp.textContent = data.list[4].main.temp + "\u00B0";
        document.getElementById("day-one-temp").appendChild(day1Temp);
        //day one forecast wind
        var day1Wind = document.createElement('span');
        day1Wind.textContent = data.list[4].wind.speed + "MPH";
        document.getElementById('day-one-wind').appendChild(day1Wind);
        //day one forecast humidity
        var day1Humidity = document.createElement('span');
        day1Humidity.textContent = data.list[4].main.humidity + "%";
        document.getElementById('day-one-humidity').appendChild(day1Humidity);
        
        //day two date
        document.getElementById('day-two-date').textContent = moment(data.list[12].dt, "X").format("M/D/YY");
        //day two forecast weather icon
        var day2Icon = document.createElement('img');
        day2Icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[12].weather[0].icon + ".png");
        document.getElementById('day-two-icon').appendChild(day2Icon);
        //day two forecast temp
        var day2Temp = document.createElement('span');
        day2Temp.textContent = data.list[12].main.temp + "\u00B0";
        document.getElementById("day-two-temp").appendChild(day2Temp);
        //day two forecast wind
        var day2Wind = document.createElement('span');
        day2Wind.textContent = data.list[12].wind.speed + "MPH";
        document.getElementById('day-two-wind').appendChild(day2Wind);
        //day two forecast humidity
        var day2Humidity = document.createElement('span');
        day2Humidity.textContent = data.list[12].main.humidity + "%";
        document.getElementById('day-two-humidity').appendChild(day2Humidity);

        //day three date
        document.getElementById('day-three-date').textContent = moment(data.list[20].dt, "X").format("M/D/YY");
        //day three forecast weather icon
        var day3Icon = document.createElement('img');
        day3Icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[20].weather[0].icon + ".png");
        document.getElementById('day-three-icon').appendChild(day3Icon);
        //day three forecast temp
        var day3Temp = document.createElement('span');
        day3Temp.textContent = data.list[20].main.temp + "\u00B0";
        document.getElementById("day-three-temp").appendChild(day3Temp);
        //day three forecast wind
        var day3Wind = document.createElement('span');
        day3Wind.textContent = data.list[20].wind.speed + "MPH";
        document.getElementById('day-three-wind').appendChild(day3Wind);
        //day three forecast humidity
        var day3Humidity = document.createElement('span');
        day3Humidity.textContent = data.list[20].main.humidity + "%";
        document.getElementById('day-three-humidity').appendChild(day3Humidity);

        //day four date
        document.getElementById('day-four-date').textContent = moment(data.list[28].dt, "X").format("M/D/YY");
        //day four forecast weather icon
        var day4Icon = document.createElement('img');
        day4Icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[28].weather[0].icon + ".png");
        document.getElementById('day-four-icon').appendChild(day4Icon);
        //day four forecast temp
        var day4Temp = document.createElement('span');
        day4Temp.textContent = data.list[28].main.temp + "\u00B0";
        document.getElementById("day-four-temp").appendChild(day4Temp);
        //day four forecast wind
        var day4Wind = document.createElement('span');
        day4Wind.textContent = data.list[28].wind.speed + "MPH";
        document.getElementById('day-four-wind').appendChild(day4Wind);
        //day four forecast humidity
        var day4Humidity = document.createElement('span');
        day4Humidity.textContent = data.list[28].main.humidity + "%";
        document.getElementById('day-four-humidity').appendChild(day4Humidity);

        //day five date
        document.getElementById('day-five-date').textContent = moment(data.list[36].dt, "X").format("M/D/YY");
        //day five forecast weather icon
        var day5Icon = document.createElement('img');
        day5Icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[36].weather[0].icon + ".png");
        document.getElementById('day-five-icon').appendChild(day5Icon);
        //day five forecast temp
        var day5Temp = document.createElement('span');
        day5Temp.textContent = data.list[36].main.temp + "\u00B0";
        document.getElementById("day-five-temp").appendChild(day5Temp);
        //day five forecast wind
        var day5Wind = document.createElement('span');
        day5Wind.textContent = data.list[36].wind.speed + "MPH";
        document.getElementById('day-five-wind').appendChild(day5Wind);
        //day five forecast humidity
        var day5Humidity = document.createElement('span');
        day5Humidity.textContent = data.list[36].main.humidity + "%";
        document.getElementById('day-five-humidity').appendChild(day5Humidity);


        // function getNth(arr,nth) {
        // var result = [];
        // for (i = 0; i < data.length; i +- 4) {
        //     result.push(arr[i]);
        // }}
        // console.log(result);
    })
}

function createButton() {
    localStorage.getItem(city);
    console.log(city);
    //delete items in list
    //loop to find all cities in local storage
    //create button for each one 
    //give button city name
    //append it to the list
    //call function on page load or user enters new city
}