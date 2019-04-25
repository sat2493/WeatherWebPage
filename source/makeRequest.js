"strict mode";

// Do a CORS request to get Davis weather hourly forecast

// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

function loadMainIcon(weather, time) {
  let main_img1 = document.getElementById("main-img1");
  let main_img2 = document.getElementById("main-img2");

  switch (weather) {
    case "scattered clouds":
      main_img1.src = "../assets/scatteredclouds.svg";
      main_img2.src = "../assets/scatteredclouds.svg";
      break;

    case "broken clouds":
      main_img1.src = "../assets/brokencloud.svg";
      main_img2.src = "../assets/brokencloud.svg";
      break;

    case "few clouds":
      if (time.getHours() < 6 || time.getHours > 18) {
        main_img1.src = "../assets/fewclouds-night.svg";
        main_img2.src = "../assets/fewclouds-day.svg";
      } else {
        main_img1.src = "../assets/clearsky.svg";
        main_img2.src = "../assets/clearsky.svg";
      }
      break;

    case "mist":
      main_img1.src = "../assets/mist.svg";
      main_img2.src = "../assets/mist.svg";
      break;

    case "clear sky":
      if (time.getHours() < 6 || time.getHours > 18) {
        main_img1.src = "../assets/clear-night.svg";
        main_img2.src = "../assets/clear-night.svg";
      } else {
        main_img1.src = "../assets/clearsky.svg";
        main_img2.src = "../assets/clearsky.svg";
      }
      break;

    case "shower rain":
      main_img1.src = "../assets/showerrain.svg";
      main_img2.src = "../assets/showerrain.svg";
      break;

    case "thunderstorm":
      main_img1.src = "../assets/showerrain.svg";
      main_img2.src = "../assets/showerrain.svg";
      break;

    case "snow":
      main_img1.src = "../assets/snow.svg";
      main_img2.src = "../assets/snow.svg";
      break;

    default:
      if (time.getHours() < 6 || time.getHours > 18) {
        main_img1.src = "../assets/rain-night.svg";
        main_img2.src = "../assets/rain-night.svg";
      } else {
        main_img1.src = "../assets/rain-day.svg";
        main_img2.src = "../assets/rain-day.svg";
      }
      break;
  }
}

function loadTime(time) {
  let hour = time.getHours();
  let ampm = "AM";

  // adjust if necessary
  if (time.getHours() >= 12) {
    hour -= 12;
    ampm = "PM";
  }
  timeOfDay = hour + ampm;

  let time_web = document.getElementById("time-web");
  let time_mobile = document.getElementById("time-mobile");

  time_web.innerHTML = timeOfDay;
  time_mobile.innerHTML = timeOfDay;
}

function loadTemperature(temperature) {
  let temp = Math.trunc(temperature);

  let temperature_web = document.getElementById("temperature-web");
  let temperature_mobile = document.getElementById("temperature-mobile");

  temperature_web.innerHTML = temp + "°";
  temperature_mobile.innerHTML = temp + "°";
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 3958.8; // Radius of the earth in miles
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in miles
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

// Make the actual CORS request.
function makeCorsRequest() {
  var city = document.getElementById('search-text-box').value;
  var api;

  console.log(!isNaN(city));

  if(isNaN(city)){ //not a number
    api = 'http://api.openweathermap.org/data/2.5/forecast/hourly?q=';
    console.log('city = ' + city);
  } else {
    api = 'http://api.openweathermap.org/data/2.5/forecast/hourly?zip=';
    console.log('zip code = ' + city);
  }

  var key = '&units=imperial&APPID=2b950a4430a34b6d1dfa6010d8599df8';  //apikey before = 'Davis,CA,US'
  var url = api + city + ',US' + key;

  let xhr = createCORSRequest('GET', url);

  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
      let responseStr = xhr.responseText;  // get the JSON string
      let object = JSON.parse(responseStr);  // turn it into an object
      console.log(JSON.stringify(object, undefined, 2));

      let lat1 = 38.5454;
      let lon1 = -121.7446;
      let lat2 = object.city.coord.lat;
      let lon2 = object.city.coord.lon;

      let distance = getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2)

      console.log('distance ' + distance);

      if (distance > 150) {
        alert('longer than 150 miles.');
      } else {
        alert('short!');
      }

      console.log(object.city.name);
      console.log(object.list[0].weather[0].description);
      console.log(object.list[0].dt_txt);
      console.log(object.list[0].main.temp);

      //var temp = object.list[0].main.temp;
      let temp = document.getElementById("temperature-web");
      temp.textContent = object.list[0].main.temp
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}
