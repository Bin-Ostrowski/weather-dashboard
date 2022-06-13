//this script is without using 

var cityInputEl = document.querySelector("#city");
var cityFormEl = document.querySelector(".form-el");
var today = moment().format('MM/DD/YYYY');
   
//handle user input from formEl
var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input element
    var cityName = cityInputEl.value.trim();
    
    if (cityName) {
        getCurrentWeather(cityName);
        cityInputEl.value = "";

        //clear current displayed weather
        //save city to local storage
        //create button under searched cities

    } else {
        alert("Please enter a city.");
    };
};

//fetch for OpenWeather api for city / current weather conditions
//http://api.openweathermap.org/data/2.5/weather?q= + cityName  - change to this.
var getCurrentWeather = function (cityName) {
    //format openWeather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&&appid=4eb3f3ce5a058a8056f9cb0c3b28f9ea"

    //make requst to the url 
    fetch(apiUrl)
        .then(function(response) {
            response.json().then(function(data) {
               displayCurrentWeather(data);
               displayForcast(data);
                });
            
        })
};


//display weather 
var displayCurrentWeather = function (data) {
    console.log(data);

    var currentCity = document.querySelector("#city-search-term")
    //display current date
    currentCity.textContent = data.name + " " + today;

    //display an icon representation of weather conditions, 
    
    //the temperature
    var temp = document.querySelector("#temp");
    temp.textContent= ("Temp: " + data.main.temp + " F");

    //the wind speed
    var wind = document.querySelector("#wind");
    wind.textContent=("Wind: " + data.wind.speed + " MPH");

    //the humidity, 
    var humidity = document.querySelector("#humidity");
    humidity.textContent=("Humidity: " + data.main.humidity + " %");
    
    // and the UV index 
    // var uvIndex = document.querySelector("#uv-index");
    // uvIndex.textContent=("UV Index: " + data.current.uvi);
    //with color for favorable, moderate, or severe. - 
        //if loop
};

var displayForcast = function(data) {
    console.log(data.daily);
    //create for loop to run though each array, grab card info and display it. 
    // var dailyForcast = data.daily;
    // console.log(dailyForcast);
    //  for (i = 0; i < forcast[5]; i++) {
    //     console.log("text");
    // }; 
};

//5 day forcast
    //display date
    // an icon representation of weather conditions, 
    //the temperature, 
    //the wind speed,
    //the humidity, 

//save searched city in localStorage
//retreive past city from local storage 
//display as button under past searched cities.

//activate search buton
cityFormEl.addEventListener("submit", formSubmitHandler);