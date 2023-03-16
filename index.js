var sensor = require("node-dht-sensor");

function weatherBalloon(cityID) {
    var key = '5afbc9f8a76d086e5653649c0590e289';
    lang = 'de';

    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&lang=de' + '&appid=' + key)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            drawWeather(data);
        })
        .catch(function () {

        });
}

function drawWeather(d) {
    var celcius = Math.round(parseFloat(d.main.temp) - 273.15);

    document.getElementById('description').innerHTML = d.weather[0].description;
    document.getElementById('temp').innerHTML = celcius + '&deg;';
    document.getElementById('location').innerHTML = d.name;
}

setInterval(weatherBalloon, 60000);

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('uhr').innerHTML = h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}

function checktemp() {
    sensor.read(11, 4, function (err, temperature, humidity) {
        if (!err) {
            document.getElementById('InnenTemp').innerHTML = temperature + '°C';
            document.getElementById('InnenHumid').innerHTML = humidity;
        }
    });
}
