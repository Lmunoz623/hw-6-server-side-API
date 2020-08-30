$(document).ready(function () {  
    

    function displayWeather() {


        // Pulling city name entered in user input field
        var cityName = $("#city").val();

        // Weather API used to search specific city weather data *use for coordinates only*
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=91348c80bc7da0b36807624414cbcad8";
        // AJAX call to pull coordinates for city
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log(response)

            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var city = response.name;
            console.log(lat);
            console.log(lon);
            console.log(city);

            var val = city;
            var key = $("#city").attr("id");
            localStorage.setItem(key, val);
            console.log(val);
            console.log(key);

            // Pushing searched city to list
            history.push(city);
            renderHistory();

            // Weather API used to provide current and forecast weather
            var newQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=91348c80bc7da0b36807624414cbcad8";
            // AJAX call for current and forecast weather data
            $.ajax({
            url: newQueryURL,
            method: "GET"
            }).then(function(response) {
                console.log(response)
                // Current date
                    var date = moment().format("l");
                    console.log(date);
                //Storing daily weather
                    var temp = response.current.temp;
                    console.log(temp);
                    var iconCode = response.current.weather[0].icon;
                    console.log(iconCode);
                    var humid = response.current.humidity;
                    console.log(humid);
                    var wind = response.current.wind_speed;
                    console.log(wind);
                    var uv = response.current.uvi;
                    console.log(uv);

                    var currIcon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");

                    $("#cityName").text(city);
                    $("#date").text(date);
                    $("#temp").text("Temp: " + temp + "˚ F");
                    $("#humid").text("Humidity: " + humid + "%");
                    $("#wind").text("Wind Speed: " + wind + " mph");
                    $("#uv").text("UV Index: " + uv);

                    $("#date").append(currIcon);

                    // Determine the appropriate Exposure Level to select based on level of UV Index
                    if (uv < 3) {
                        $("#uv").attr("class", "favorable");
                    } else if (uv >= 3 && uv < 8) {
                        $("#uv").attr("class", "moderate");
                    } else if (uv >= 8) {
                        $("#uv").attr("class", "severe");
                    }  



                //5-Day forecast: (date, icon, temp, humidity) For Loop
                for (var i = 0; i < 5; i++) {
                    var dateIndex = parseInt([i]) + 1;
                    console.log(dateIndex);
                    var forecastDate = moment().add(dateIndex, "days").format("l");
                    console.log(forecastDate);

                    var forecastIndex = response.daily[i];
                    console.log(forecastIndex);
                    var forecastIconCode = forecastIndex.weather[0].icon;
                    console.log(forecastIconCode);
                    var forecastTemp = forecastIndex.temp.day;
                    console.log(forecastTemp);
                    var forecastHumid = forecastIndex.humidity;
                    console.log(forecastHumid);

                    var forecastDiv = $("<div>").attr("class", "col");
                    var dateDiv = $("<div>").text(forecastDate);
                    var iconImage = $("<img>").attr("src", "http://openweathermap.org/img/w/" + forecastIconCode + ".png");
                    var tempDiv = $("<div>").text("Temp: " + forecastTemp + "˚ F");
                    var humidDiv = $("<div>").text("Humidity: " + forecastHumid + "%");

                    $("#forecast").append(forecastDiv);
                    forecastDiv.append(dateDiv);
                    forecastDiv.append(iconImage);
                    forecastDiv.append(tempDiv);
                    forecastDiv.append(humidDiv);

                }
            })
        })
    }
    
   

    var history = [];

    function renderHistory() {


        $(".list-group").empty();
    
        for (var i = 0; i < history.length; i++) {

            var searchedCity = $("<button>");
            searchedCity.addClass("list-group-item list-group-item-action history-btn");
            searchedCity.attr("data-name", history[i]);
            searchedCity.attr("type", "button")
            searchedCity.text(history[i]);
            $(".list-group").append(searchedCity);
    

        }
    }

    $(".btn").on("click", function(event) {
        
        event.preventDefault();
        displayWeather();
    })


    function renderLastCity() {

            $("#city").val(localStorage.getItem("city"));

            var city = $("#city").val();


            // Weather API used to search specific city weather data *use for coordinates only*
            var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=91348c80bc7da0b36807624414cbcad8";
            // AJAX call to pull coordinates for city
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {

                var lat = response.coord.lat;
                var lon = response.coord.lon;
                console.log(lat);
                console.log(lon);

                console.log(response);
                // Weather API used to provide current and forecast weather
                var newQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=91348c80bc7da0b36807624414cbcad8";
                // AJAX call for current and forecast weather data
                $.ajax({
                url: newQueryURL,
                method: "GET"
                }).then(function(response) {

                console.log(response)
                // Current date
                    var date = moment().format("l");
                    console.log(date);
                //Storing daily weather
                    var temp = response.current.temp;
                    console.log(temp);
                    var iconCode = response.current.weather[0].icon;
                    console.log(iconCode);
                    var humid = response.current.humidity;
                    console.log(humid);
                    var wind = response.current.wind_speed;
                    console.log(wind);
                    var uv = response.current.uvi;
                    console.log(uv);

                    var currIcon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");

                    $("#cityName").text(city);
                    $("#date").text(date);
                    $("#temp").text("Temp: " + temp + "˚ F");
                    $("#humid").text("Humidity: " + humid + "%");
                    $("#wind").text("Wind Speed: " + wind + " mph");
                    $("#uv").text("UV Index: " + uv);

                    $("#date").append(currIcon);

                    // Determine the appropriate Exposure Level to select based on level of UV Index
                    if (uv < 3) {
                        $("#uv").attr("class", "favorable");
                    } else if (uv >= 3 && uv < 8) {
                        $("#uv").attr("class", "moderate");
                    } else if (uv >= 8) {
                        $("#uv").attr("class", "severe");
                    }  



                //5-Day forecast: (date, icon, temp, humidity) For Loop
                for (var i = 0; i < 5; i++) {
                    var dateIndex = parseInt([i]) + 1;
                    console.log(dateIndex);
                    var forecastDate = moment().add(dateIndex, "days").format("l");
                    console.log(forecastDate);

                    var forecastIndex = response.daily[i];
                    console.log(forecastIndex);
                    var forecastIconCode = forecastIndex.weather[0].icon;
                    console.log(forecastIconCode);
                    var forecastTemp = forecastIndex.temp.day;
                    console.log(forecastTemp);
                    var forecastHumid = forecastIndex.humidity;
                    console.log(forecastHumid);

                    var forecastDiv = $("<div>").attr("class", "col");
                    var dateDiv = $("<div>").text(forecastDate);
                    var iconImage = $("<img>").attr("src", "http://openweathermap.org/img/w/" + forecastIconCode + ".png");
                    var tempDiv = $("<div>").text("Temp: " + forecastTemp + "˚ F");
                    var humidDiv = $("<div>").text("Humidity: " + forecastHumid + "%");

                    $("#forecast").append(forecastDiv);
                    forecastDiv.append(dateDiv);
                    forecastDiv.append(iconImage);
                    forecastDiv.append(tempDiv);
                    forecastDiv.append(humidDiv);



                }
            })
        })

    }

    renderLastCity();



    $(".history-btn").on("click", function () {
        displayWeather();
    })


});
