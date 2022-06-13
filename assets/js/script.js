var cityInputEl = document.querySelector("#city");
var cityFormEl = document.querySelector(".form-el");
var searchedBtnContainer = document.querySelector(".past-search-container");
var today = moment().format('MM/DD/YYYY');
var tomorrow =moment().add(1, 'days').format('MM/DD/YYYY');



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
        localStorage.setItem("city", cityName)
        
        // reteive from local storage and create button under searched cities

        var createPastBtn = function () { 
            
            var pastSearchedCity = document.createElement("button");
            pastSearchedCity.classList.add("past-search-btn");
            pastSearchedCity.textContent = localStorage.getItem("city");
            console.log(pastSearchedCity);

            searchedBtnContainer.appendChild(pastSearchedCity);
        }
        createPastBtn();
    } else {
        alert("Please enter a city.");
    };
};

//fetch for OpenWeather api for city / current weather conditions
//http://api.openweathermap.org/data/2.5/weather?q=" + cityName  - change to this.
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
        if (data.current.uvi < 3) {
            uvIndex.className="low-uvIndex";
            console.log ("low")
        } else if (data.current.uvi < 6) {
            uvIndex.className="moderate-uvIndex";
        }else {
            uvIndex.className="high-uvIndex";
        } 
};

var displayForcast = function(data) {
    //create for loop to run though each array, grab card info and display it. 
    var forcast = data.daily; 
    // console.log(dailyForcast);
     for (i = 0; i < forcast.length; i++) {
        console.log([i]);
    }; 
};

//5 day forcast
    //display date
    // an icon representation of weather conditions, 
    //the temperature, 
    //the wind speed,
    //the humidity, 



//activate search buton

cityFormEl.addEventListener("submit", formSubmitHandler);

