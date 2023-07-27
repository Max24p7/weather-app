//API Key from OpenWeather, retrieved on 7/27
var APIKey = "684199247dee8f69dba5caae5027aed8"

var city;

var selectedCity = document.getElementById("selectedCity");
var date = document.getElementById("date");
var icon = document.getElementById("icon");
var temp = document.getElementById("temp");
var windSpeed = document.getElementById("windSpeed");
var humidity = document.getElementById("humidity");
var searchBox = document.getElementById("searchBox");
var searchBtn = document.getElementById('searchBtn');

//Search function event listener
searchBtn.addEventListener("click", function() {
    var city = searchBox.value;
    getWeatherData(city); //Retrieve OpenWeather data with user inputed city name.
});

//function to fetch and display data
function getWeatherData(city) {
    //Query for retrieving data from the API, added &units=imperial to receive weather info in Farenheit.
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    fetch(queryURL)  //fetch to make a GET request
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("City not found"); //Error if city does not exist
            }
        })
        .then(function(data) {
            // Update elements in HTML
            selectedCity.textContent = data.name;
            date.textContent = new Date(data.dt * 1000).toLocaleDateString();
            icon.textContent = data.weather[0].icon;
            temp.textContent = "Temperature: " + data.main.temp + " °F";
            windSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH";
            humidity.textContent = "Humidity: " + data.main.humidity + " %";
            getForecast(city);
        })
        .catch(function(error) { //error message if invalid
            alert(error.message);
        });
}

