# Weather Dashboard

## Overview

This module challenge was to create a weather outlook dashboard capable of retaining multiple city searches to plan a multi-city trip. The challenge focus is utilizing a third-party API to retrieve the data and localStorage for persistent data. 

## Project Description

The Acceptance Criteria for this project is as follows:

GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history

WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

## Run and Install

The deployed project can be accessed [here](). A screenshot for my weather dashboard can be found here:

## How to Use the Project

This project was my first expansive experience with server-side APIs and I ended up using four for this project between three iterations of OpenWeather APIs and then the moment.js API as well. I know definitively I could have shorthanded some of the create/style/content/append data for the forecast cards but I felt it was good practice to build it out more fully before trying to streamline the code more. Mostly I was glad to be able to recognize that I could have shortened it so soon after writing it in the first place. The project is missing a few components like a color change function for the UV index and the search history being retained on the page. I have it pseudo-coded out around lines 22-29 but have not had the time to work it out into broader functionality. However, I was able to account for a five-day forecast with multiple data points, including weather icons. For right now, the search button stores the entry in local storage but it does not yet feed into the query urls. At this time, I have a placeholder city (Tacoma) to fulfill the variable for the city to generate fetch results that can be displayed on the page.

## How to Contribute to the Project

This project was assigned to build familiarity with third-party APIs to build a functional weather dashboard and retain search history populated on the page.