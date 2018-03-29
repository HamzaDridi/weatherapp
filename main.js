var temp;
var unit = 'F';
$(document).ready(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            $.ajax({
                url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyD3gp1u-d_L__Sf7edU6vVM8U70Siysqxs',
                success: function (data) {
                    $('#location').html(data.results[2].formatted_address);
                },
                cache: false
            });
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=imperial&appid=05f34d518f4ce6bcf956af1cae257f62',
                success: function (data) {
                    temp = data.main.temp;
                    
                $('#WeatherTemperature').html(Math.round(temp));
                $('#weatherName').html(data.weather["0"].main);
                //console.log(WeatherIcon(data.weather["0"].description));
                $('#weathericon').attr("data",WeatherIcon(data.weather["0"].description) );

                },
                cache: false
            });
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
});

function convertunit() {
    if (unit == 'F') {
         temp = (temp - 32) / 1.8;
        
        unit = 'C';
    } else {
       temp = (temp * 1.8) + 32;
        unit = 'F';
    }
    $('#unit').html(unit);
    $('#WeatherTemperature').html(Math.round(temp))
}

function WeatherIcon(weatherText) {

    switch (weatherText) {
        case "clear sky":
            return "icon/"+"01_sunny.svg";
            break;
        case "few clouds":
            return "icon/"+"02_partly_cloudy.svg";
            break;
        case "scattered clouds":
            return "icon/"+"04_cloudy.svg";
            break;
        case "broken clouds":
            return "icon/"+"04_cloudy.svg";
            break;
        case "shower rain":
            return "icon/"+"05_drizzle.svg";
            break;
        case "rain":
            return "icon/"+"06_rain.svg";
            break;
        case "thunderstorm":
            return "icon/"+"thuderstorm.svg";
            break;
        case "snow":
           return "icon/"+"07_snowy.svg";
            break;
        case "mist":
           return "icon/"+"Mist-01.svg";
            break;
        default:
            return "problem.svg";

    }
}
  