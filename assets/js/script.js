var clearSearchBtn = document.querySelector("#reset-button");
var zipcodeUserInputEl = document.querySelector("#zipcode");
var zipcodeFormEl = document.querySelector("#zipcode-form");


var searchContainerEl = document.querySelector("#city-search-history")
var currentSearchResult = 0;
var searchHistory = [];

// this activates our api and retrieves and displays our forcast in the html
function getWeather(zipcode) {
    var weatherAPI = "api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&units=imperial&appid=1f888aff147e6855912e6ab6b7e1ee43";

    fetch(weatherAPI).then(function (response) {
        return response.json();
    })

        .then(function (response) {
            var cityName = document.querySelector("#name-of-city")
            cityName.textContent = response.name;

            var currentDay = document.querySelector("#current-day")
            currentDay.textContent = moment().format("[(]MM[/]D[/]YYYY[)]")

            var weatherIcon = document.querySelector("#weather-icon")
            weatherIcon.setAttribute("src", 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '.png');

            var temp = document.querySelector("#current-temp")
            temp.textContent = "Temperature: " + response.main.temp + "°F";

            var feelsLike = document.querySelector("#feels-like")
            feelsLike.textContent = "Feels Like: " + response.main.feels_like + "°F";

            var humidity = document.querySelector("#humidity")
            humidity.textContent = "Humidity: " + response.main.humidity + "%";

            var windSpeed = document.querySelector("#wind-speed")
            windSpeed.textContent = "Wind: " + response.wind.speed + " mph";

            // city info
            var searchObj = [{
                city: response.name,
                searchID: currentSearchResult,
                zipcode: zipcode,
                lat: response.coord.lat,
                long: response.coord.lon
            }]

            searchHistory.push(searchObj)
            localStorage.setItem("searches", JSON.stringify(searchHistory))

            var buttonContainer = document.createElement("div")
            buttonContainer.className = "row"

            var historyButton = document.createElement("button")
            historyButton.className = "btn bg-white border history-button city-button"
            historyButton.id = zipcode
            historyButton.textContent = response.name
            historyButton.addEventListener("click", function (e) {
                console.log(event.target.id);
                getWeather(event.target.id);
            });

            buttonContainer.appendChild(historyButton);
            searchContainerEl.appendChild(buttonContainer);

            var lat = response.coord.lat
            var lon = response.coord.lon

            getUVindex(lat, lon)
        })

    currentSearchResult++
};

// function that allocates all weather info using the weather api key
function getForecast(zipcode) {
    var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipcode + ",us&units=imperial&appid=1f888aff147e6855912e6ab6b7e1ee43";

    fetch(forecastAPI).then(function (response) {
        return response.json();
    })

        .then(function (response) {
            // Forcast for Day 1
            var day1El = document.querySelector("#day-1")
            day1El.className = "column col forecast-container"

            var day1Header = document.querySelector("#day-1-date")
            day1Header.className = "forecast-head";
            day1Header.textContent = moment().add(1, "days").format("MM[/]D[/]YYYY");

            var day1Temp = document.querySelector("#day-1-temp")
            day1Temp.className = "forcast-information"
            day1Temp.textContent = "Temp: " + Math.floor(response.list[3].main.temp) + "°F";

            var day1Humidity = document.querySelector("#day-1-humidity")
            day1Humidity.className = "forcast-information"
            day1Humidity.textContent = "Humidity: " + response.list[3].main.humidity + "%";

            var day1Icon = document.querySelector("#day1-icon")
            day1Icon.setAttribute("src", 'http://openweathermap.org/img/wn/' + response.list[3].weather[0].icon + '.png')

            // Forcast for Day 2
            var day2El = document.querySelector("#day-2")
            day2El.className = "column col forecast-container"

            var day2Header = document.querySelector("#day-2-date")
            day2Header.className = "forecast-head";
            day2Header.textContent = moment().add(2, "days").format("MM[/]D[/]YYYY");

            var day2Temp = document.querySelector("#day-2-temp")
            day2Temp.className = "forcast-information"
            day2Temp.textContent = "Temp: " + Math.floor(response.list[11].main.temp) + "°F";

            var day2Humidity = document.querySelector("#day-2-humidity")
            day2Humidity.className = "forcast-information"
            day2Humidity.textContent = "Humidity: " + response.list[11].main.humidity + "%";

            var day2Icon = document.querySelector("#day2-icon")
            day2Icon.setAttribute("src", 'http://openweathermap.org/img/wn/' + response.list[11].weather[0].icon + '.png')

            // Forecast for Day 3
            var day3El = document.querySelector("#day-3")
            day3El.className = "column col forecast-container"

            var day3Header = document.querySelector("#day-3-date")
            day3Header.className = "forecast-head";
            day3Header.textContent = moment().add(3, "days").format("MM[/]D[/]YYYY");

            var day3Temp = document.querySelector("#day-3-temp")
            day3Temp.className = "forcast-information"
            day3Temp.textContent = "Temp: " + Math.floor(response.list[19].main.temp) + "°F";

            var day3Humidity = document.querySelector("#day-3-humidity")
            day3Humidity.className = "forcast-information"
            day3Humidity.textContent = "Humidity: " + response.list[19].main.humidity + "%";

            var day3Icon = document.querySelector("#day3-icon")
            day3Icon.setAttribute("src", 'http://openweathermap.org/img/wn/' + response.list[19].weather[0].icon + '.png')

            // Forecast for Day 4
            var day4El = document.querySelector("#day-4")
            day4El.className = "column col forecast-container"

            var day4Header = document.querySelector("#day-4-date")
            day4Header.className = "forecast-head";
            day4Header.textContent = moment().add(4, "days").format("MM[/]D[/]YYYY");

            var day4Temp = document.querySelector("#day-4-temp")
            day4Temp.className = "forcast-information"
            day4Temp.textContent = "Temp: " + Math.floor(response.list[27].main.temp) + "°F";

            var day4Humidity = document.querySelector("#day-4-humidity")
            day4Humidity.className = "forcast-information"
            day4Humidity.textContent = "Humidity: " + response.list[27].main.humidity + "%";

            var day4Icon = document.querySelector("#day4-icon")
            day4Icon.setAttribute("src", 'http://openweathermap.org/img/wn/' + response.list[27].weather[0].icon + '.png')

            // Forecast for Day 5
            var day5El = document.querySelector("#day-5")
            day5El.className = "column col forecast-container"

            var day5Header = document.querySelector("#day-5-date")
            day5Header.className = "forecast-head";
            day5Header.textContent = moment().add(5, "days").format("MM[/]D[/]YYYY");

            var day5Temp = document.querySelector("#day-5-temp")
            day5Temp.className = "forcast-information"
            day5Temp.textContent = "Temp: " + Math.floor(response.list[35].main.temp) + "°F";

            var day5Humidity = document.querySelector("#day-5-humidity")
            day5Humidity.className = "forcast-information"
            day5Humidity.textContent = "Humidity: " + response.list[35].main.humidity + "%";

            var day5Icon = document.querySelector("#day5-icon")
            day5Icon.setAttribute("src", 'http://openweathermap.org/img/wn/' + response.list[35].weather[0].icon + '.png')
        })
}

/* 
$(document).on("click", ".list-group-item", function () {
    var cityName = $(this).text();
    clearDisplayedWeatherInfo();
    resetGlobalVariables();
    searchCity(cityName);
});

 function getColorCodeForUVIndex(uvIndex) {
    var uvIndexValue = parseFloat(uvIndex);
    var colorcode = "";
    if (uvIndexValue <= 2) {
        colorcode = "#00ff00";
    }
    else if ((uvIndexValue > 2) && (uvIndexValue <= 5)) {
        colorcode = "#ffff00";
    }
    else if ((uvIndexValue > 5) && (uvIndexValue <= 7)) {
        colorcode = "#ffa500";
    }
    else if ((uvIndexValue > 7) && (uvIndexValue <= 10)) {
        colorcode = "#9e1a1a";
    }
    else if (uvIndexValue > 10) {
        colorcode = "#7f00ff";
    }
    return colorcode;
}

function resetGlobalVariables() {
    city = "";
    currentDate = "";
    tempF = "";
    humidityValue = "";
    windSpeed = "";
    uvIndexValue = "";
    latitude = "";
    longitude = "";
    minTempK = "";
    maxTempK = "";
    minTempF = "";
    maxTempF = "";
    dayhumidity = "";
    currentWeatherIconCode = "";
    currentWeatherIconUrl = "";
    iconcode = "";
    iconurl = "";
    country = "";
} */

// function that keeps and loads the search history
function loadSearchHistory() {
    searchHistory = localStorage.getItem("searches")
    if (!searchHistory || searchHistory === null) {
        searchHistory = [];
        return false;
    }
    searchHistory = JSON.parse(searchHistory)
    displaySearches();
}

// function that clears and deletes search history
function clearSearchHistory() {
    searchHistory = [];
    localStorage.clear();
    location.reload();
}

// function that shows search history to the user
function displaySearches() {
    currentSearchResult = 0;
    for (var i = 0; i < searchHistory.length; i++) {

        var buttonContainer = document.createElement("div")
        buttonContainer.className = "row"

        var historyButton = document.createElement("button");
        //history button class add to match for event listener
        historyButton.className = "btn bg-white border history-button city-button"
        historyButton.id = "history-" + currentSearchResult
        historyButton.textContent = searchHistory[currentSearchResult][0].city
        historyButton.dataset = searchHistory[currentSearchResult][0].zipcode

        buttonContainer.appendChild(historyButton);
        searchContainerEl.appendChild(buttonContainer);

        currentSearchResult++
    }
}

function searchCity(cityName) {
    // build URL to query the database
    console.log(cityName);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName + "&appid=" + APIKey;

    // run AJAX to OpenWatherAPI
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        // store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            var result = response;
            console.log(result);
            city = result.name.trim();
            //  var countryCode = result.sys.country;
            //  country = getCountryName(countryCode).trim();
            //  currentDate = moment().tz(country + "/" + city).format('l');
            currentDate = moment.unix(result.dt).format("l");
            console.log(currentDate);
            humidityValue = result.main.humidity;
            windSpeed = result.wind.speed;
            currentWeatherIconCode = result.weather[0].icon;
            currentWeatherIconUrl = "https://openweathermap.org/img/w/" + currentWeatherIconCode + ".png";
            var uvIndexQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitude;
            $.ajax({
                url: uvIndexQueryUrl,
                method: "GET"
            })
                .then(function (response) {
                    uvIndexValue = response.value;
                    displayCurrentWeather()

                    var fiveDayQueryUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&appid=" + APIKey + "&cnt=5";
                    $.ajax({
                        url: fiveDayQueryUrl,
                        method: "GET"
                    })
                        .then(function (response) {
                            var fiveDayForecast = response.list;
                            addCardDeckHeader()
                            for (var i = 0; i < 5; i++) {
                                iconcode = fiveDayForecast[i].weather[0].icon;
                                iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
                                //  dateValue = moment().tz(country + "/" + city).add(i, 'days').format('l');
                                dateValue = moment.unix(fiveDayForecast[i].dt).format('l');
                                maxTempK = fiveDayForecast[i].temp.max;
                                maxTempF = (((fiveDayForecast[i].temp.max) - 273.15) * 1.80 + 32).toFixed(1);
                                dayhumidity = fiveDayForecast[i].humidity;
                                displayDayForeCast()
                            }
                        });
                });
        });
}