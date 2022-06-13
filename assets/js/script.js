var cityInputEl = document.querySelector("#city");
var cityFormEl = document.querySelector(".form-el");
var today = moment().format('MM/DD/YYYY');


//fetch for geocode.xyz api to get entered city's lat / long 
var getCityLongLatt = function (cityName) {
    var apiUrl = "https://geocode.xyz/?locate=" + cityName +"&geoit=JSON";
    //make reqyest to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            // console.log(data.latt, data.longt);
            getCurrentWeather(data, cityName);
            displayCityName(data);
        })
    })
};
   
//handle user input from formEl
var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input element
    var cityName = cityInputEl.value.trim();
    
    if (cityName) {
        getCityLongLatt(cityName);
        cityInputEl.value = "";

        //clear current displayed weather
        //save city to local storage
        //create button under searched cities

    } else {
        alert("Please enter a city.");
    };
};

//fetch for OpenWeather api for city / current weather conditions
//http://api.openweathermap.org/data/2.5/weather?q=London - change to this.
var getCurrentWeather = function (data) {
    //format openWeather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.latt + "&lon=" + data.longt + "&exclude=minutely,hourly,alerts&units=imperial&&appid=4eb3f3ce5a058a8056f9cb0c3b28f9ea"

    //make requst to the url 
    fetch(apiUrl)
        .then(function(response) {
            response.json().then(function(data) {
               displayCurrentWeather(data);
               displayForcast(data);
                });
            
        })
};

//display city name
var displayCityName = function (data) {
    var currentCity = document.querySelector("#city-search-term")
    //display current date
    currentCity.textContent = data.standard.city + " " + today;
};

//display weather 
var displayCurrentWeather = function (data) {
    console.log(data);

    //display an icon representation of weather conditions, 
    
    //the temperature
    var temp = document.querySelector("#temp");
    temp.textContent= ("Temp: " + data.current.temp + " F");

    //the wind speed
    var wind = document.querySelector("#wind");
    wind.textContent=("Wind: " + data.current.wind_speed + " MPH");

    //the humidity, 
    var humidity = document.querySelector("#humidity");
    humidity.textContent=("Humidity: " + data.current.humidity + " %");
    
    // and the UV index 
    var uvIndex = document.querySelector("#uv-index");
    uvIndex.textContent=("UV Index: " + data.current.uvi);
    
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

//fetch for 1 day forcase of same city
    //display date
    // an icon representation of weather conditions, 
    //the temperature, 
    //the wind speed,
    //the humidity, 
    

//then duplicate function for 2 days, 3 days, 4 days, 5 days. = 5-day future forcast

//save searched city in localStorage
//retreive past city from local storage 
//display as button under past searched cities.

//activate search buton
cityFormEl.addEventListener("submit", formSubmitHandler);