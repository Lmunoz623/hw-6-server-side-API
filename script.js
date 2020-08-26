$(document).ready(function () {   


    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=91348c80bc7da0b36807624414cbcad8";

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        console.log(response)
    });
});