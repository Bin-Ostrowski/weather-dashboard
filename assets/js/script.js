var cityInputEl = document.querySelector("#city");
var cityFormEl = document.querySelector(".form-el");
var searchedBtnContainer = document.querySelector(".past-search-container");
var pastBtnsEl = document.querySelector("#pastBtnsEl");
var today = moment().format('MM/DD/YYYY');
var tomorrow = moment().add(1, 'days').format('MM/DD/YYYY');
var apiKey = '&appid=4eb3f3ce5a058a8056f9cb0c3b28f9ea';
var newApiKey = apiKey;

//fetch for geocode.xyz api to get entered city's lat / long 
var getCityLongLatt = function (cityName) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5" + newApiKey;
    //make reqyest to the url
    fetch(apiUrl).then(function(response) {
        return response.json()
    }).then(function(data) {
            console.log(data);
            getCurrentWeather(data[0]);
            displayCityName(data[0]);
        })
};
   
//handle user input from formEl
var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input element
    var cityName = cityInputEl.value.trim();
    
    if (cityName) {
        getCityLongLatt(cityName);
        saveCityName(cityName);
        cityInputEl.value = "";

        //clear current displayed weather
        saveCityName(cityName)
    } else {
        alert("Please enter a city.");
    };
};

//save city to local storage
var saveCityName = function (cityName) {
  localStorage.setItem("city", cityName)  
};

  // reteive from local storage and create button under searched cities
var createPastBtn = function () { 
            
    var pastSearchedCityBtn = document.createElement("button");
    pastSearchedCityBtn.classList.add("past-search-btn");
   
    pastSearchedCityBtn.textContent = localStorage.getItem("city");
    console.log(pastSearchedCityBtn);

    searchedBtnContainer.appendChild(pastSearchedCityBtn);
}
createPastBtn();


//fetch for OpenWeather api for city / current weather conditions
var getCurrentWeather = function (data) {
    //format openWeather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.lat + "&lon=" + data.lon + "&exclude=minutely,hourly,alerts&units=imperial&&appid=4eb3f3ce5a058a8056f9cb0c3b28f9ea";

    //make requst to the url 
    fetch(apiUrl)
        .then(function(response) {
            
            return response.json()
        }).then(function(data) {
               displayCurrentWeather(data, data.name);
               displayForcast(data);
                });
    };

//display city name
var displayCityName = function (data) {
    var currentCity = document.querySelector("#city-search-term");
    //display current date
    currentCity.textContent = data.name + " " + today;
};

//display weather 
var displayCurrentWeather = function (data) {
    console.log(data);

    //display an icon of weather conditions, 
    var iconCode = data.current.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/"+ iconCode + "@2x.png";
    var icon = document.querySelector("#icon");
    icon.innerHTML = ("<img src=" + iconUrl + ">");
   
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
        } else if (data.current.uvi < 6) {
            uvIndex.className="moderate-uvIndex";
        }else {
            uvIndex.className="high-uvIndex";
        };
};

//create 5 day forcast container
var displayForcast = function(data) {
    var h2 = document.createElement('h2');
    h2.textContent = '5 Day Forecast';
    
    var forcastContainer = document.createElement('div');
    forcastContainer.setAttribute('class', 'row');

    //create for loop to run though each array, grab card info and display it. 
   for (i = 1; i < 6; i++) {
       console.log(data.daily[i]);
       
       //create cards to hold each day's forcast
       var col = document.createElement('div');
       col.setAttribute('class', "col-md forcast-card");
       var colBody = document.createElement('div');

       //display date
       var  title = document.createElement('h4');
       title.textContent = new Date(data.daily[i].dt*1000); //.getDate(); ?????
       title.setAttribute('class', 'forcast-font');

       //display icon = 
       var icon = document.createElement('div');
       var iconCode = data.daily[i].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/"+ iconCode + "@2x.png";
        icon.innerHTML = ("<img src=" + iconUrl + ">");

       //display temp
       var temp = document.createElement('p');
       temp.textContent = ("Temp: " +  data.daily[i].temp.day + " F");
       temp.setAttribute('class', 'forcast-font');
       
       //display wind speed
       var wind = document.createElement('p');
       wind.textContent=("Wind: " + data.daily[i].wind_speed + " MPH");
       wind.setAttribute('class', 'forcast-font');

       //display humidity
       var humidity = document.createElement('p');
       humidity.textContent=("Humidity: " + data.daily[i].humidity + " %");
       humidity.setAttribute('class', 'forcast-font');
       
       //append all created Elements to siblings/parents
       col.append(colBody);

       colBody.append(title);
       colBody.append(icon);
       colBody.append(temp);
       colBody.append(wind);
       colBody.append(humidity);

       forcastContainer.append(col)
    }; 
    document.querySelector('#forcast').append(h2, forcastContainer);
}; 

//activate past searched btn
// pastBtnsEl.addEventListener("click", formSubmitHandler());

//activate search buton
cityFormEl.addEventListener("submit", formSubmitHandler);

