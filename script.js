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


            //Update elements in HTML
            selectedCity.textContent = data.name;
            date.textContent = new Date(data.dt * 1000).toLocaleDateString();


            var iconCode = data.weather[0].icon;

            // Call the displayIcon function to display the weather icon
            displayIcon(iconCode);


            temp.textContent = "Temperature: " + Math.round(data.main.temp) + " °F";
            windSpeed.textContent = "Wind Speed: " + Math.round(data.wind.speed) + " MPH";
            humidity.textContent = "Humidity: " + data.main.humidity + " %";
            getForecast(city);
        })
        .catch(function(error) { //error message if invalid
            alert(error.message);
        });
}

// Define a function to display the weather icon
function displayIcon(iconCode) {
    // Get the icon element by its id
    var icon = document.getElementById("icon");
  
    // Use a switch statement to check the icon code and assign the corresponding HTML entity code
    switch (iconCode) {
      case "01d":
      case "01n":
        // Sun icon
        icon.innerHTML = "&#127774;";
        break;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        // Cloud icon
        icon.innerHTML = "&#9729;";
        break;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        // Rain icon
        icon.innerHTML = "&#127783;";
        break;
      case "11d":
      case "11n":
        // Lightning icon
        icon.innerHTML = "&#9889;";
        break;
      case "13d":
      case "13n":
        // Snow icon
        icon.innerHTML = "&#10052;";
        break;
      case "50d":
      case "50n":
        // Fog icon
        icon.innerHTML = "&#127787;";
        break;
      default:
        // Unknown icon
        icon.innerHTML = "?";
    }
  }

//Function to retrive and display forecast
function getForecast(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
    fetch(queryURL)  //fetch to make a GET request
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Forecast not available"); //Error if there is no forecast available.
        }
      })
      .then(function(data) {
        //Use the data to update elements
        var fiveDay = document.querySelectorAll("#fiveDay");
        //Loop over the array of the forecast data
        for (var i = 0; i < fiveDay.length; i++) {
          var index = i * 8 + 4;
  
          //update the elements with the retrieved data
          fiveDay[i].children[0].textContent = new Date(data.list[index].dt * 1000).toLocaleDateString();

          displayIcon(data.list[index].weather[0].icon, fiveDay[i].children[1]);

          fiveDay[i].children[2].textContent = "Temp: " + Math.round(data.list[index].main.temp) + " °F";
          fiveDay[i].children[3].textContent = "Wind: " + Math.round(data.list[index].wind.speed) + " MPH";
          fiveDay[i].children[4].textContent = "Humidity: " + data.list[index].main.humidity + " %";
        }
      })
      .catch(function(error) {
        alert(error.message); //error if somethign goes wrong
      });
  }
