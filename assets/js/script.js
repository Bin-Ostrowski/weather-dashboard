var cityInputEl = document.querySelector("#city");
var userFormEl = document.querySelector(".form-el");

//fetch for geocode.xyz api to get entered city's lat / long 
var getCityLongLatt = function (cityName) {
    var apiUrl = "https://geocode.xyz/?locate=" + cityName +"&geoit=JSON";
    //make reqyest to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data.latt, data.longt);
        // var cityLatt = data.latt;
        // var cityLongt = data.longt;
        })
    })
  
};
   
//handle user input from form
var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input element
    var cityName = cityInputEl.value.trim();
    
    if (cityName) {
        getCityLongLatt(cityName);
        
        cityInputEl.value = "";
    } else {
        alert("Please enter a city.");
    }
}

// var displayCity = function (cityName, searchTerm) {
//     console.log(cityName);
//     console.log(searchTerm);
// }
//activate search buton
userFormEl.addEventListener("submit", formSubmitHandler);

// //fetch for api
// const getCurrentWeather = function () {
//     //format openWeather api url
//     var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=4eb3f3ce5a058a8056f9cb0c3b28f9ea"

//     //make requst to the url
//     fetch(apiUrl)
//         .then(function(response) {
//             response.json().then(function(data) {
//                console.log(data, city);
//                 });
            
//         })
// }
//response  city / current weather conditions

//display city name
//display current date
//display an icon representation of weather conditions, 
    //the temperature, 
    //the wind speed,
    //the humidity, 
    // and the UV index with color for favorable, moderate, or severe. - if loop



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

