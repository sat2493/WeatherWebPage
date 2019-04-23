"strict mode";

// Do a CORS request to get Davis weather hourly forecast

// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// adjusts to PST
function convertTime(time) {
  let hour = time.getHours();
  hour += 16;
  // if we receive a case of 25:00 or greater, adjust
  if (hour > 24) {
    hour -= 24;
  }

  return hour;
}

function loadMainIcon(weather, convertedTime) {
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
      if (convertedTime < 6 || convertedTime > 18) {
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
      if (convertedTime < 6 || convertedTime > 18) {
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
      if (convertedTime < 6 || convertedTime > 18) {
        main_img1.src = "../assets/rain-night.svg";
        main_img2.src = "../assets/rain-night.svg";
      } else {
        main_img1.src = "../assets/rain-day.svg";
        main_img2.src = "../assets/rain-day.svg";
      }
      break;
  }
}

function loadTime(convertedTime) {
  let hour = convertedTime;
  let ampm = "AM";

  // adjust if necessary
  if (convertedTime >= 12) {
    hour -= 12;
    ampm = "PM";
  } else if (convertedTime == 0) {
    hour += 12;
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

function loadFutureIcons (futureWeather, convertedFutureTime, i) {
  let id = "main-img" + i;
  console.log(futureWeather);
  console.log(id);
  let main_img = document.getElementById(id);

  switch (futureWeather) {
    case "scattered clouds":
      main_img.src = "../assets/scatteredclouds.svg";
      break;

    case "broken clouds":
      main_img.src = "../assets/brokencloud.svg";
      break;

    case "few clouds":
      if (convertedFutureTime < 6 || convertedFutureTime > 18) {
        main_img.src = "../assets/fewclouds-night.svg";
      } else {
        main_img.src = "../assets/clearsky.svg";
      }
      break;

    case "mist":
      main_img.src = "../assets/mist.svg";
      break;

    case "clear sky":
      if (convertedFutureTime < 6 || convertedFutureTime > 18) {
        main_img.src = "../assets/clear-night.svg";
      } else {
        main_img.src = "../assets/clearsky.svg";
      }
      break;

    case "shower rain":
      main_img.src = "../assets/showerrain.svg";
      break;

    case "thunderstorm":
      main_img.src = "../assets/showerrain.svg";
      break;

    case "snow":
      main_img.src = "../assets/snow.svg";
      break;

    default:
      if (convertedFutureTime < 6 || convertedFutureTime > 18) {
        main_img.src = "../assets/rain-night.svg";
      } else {
        main_img.src = "../assets/rain-day.svg";
      }
      break;
  }
}

function loadFutureTime(futureTime, i) {
  let hour = futureTime.getHours();
  let ampm = "AM";

  // adjust if necessary
  if (futureTime.getHours() >= 12) {
    hour -= 12;
    ampm = "PM";
  }

  timeOfDay = hour + ":00 " + ampm;
  id = "time" + i;

  let time = document.getElementById(id);

  time.innerHTML = timeOfDay;
}

function loadFutureTemperature(futureTemperature, i) {
  let temp = Math.trunc(futureTemperature);
  let id = "temperature" + i;

  let temperature = document.getElementById(id);

  temperature.innerHTML = temp + "°";
}

// Make the actual CORS request.
function makeCorsRequest() {

  let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=Davis,CA,US&units=imperial&APPID=xxx"

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
      console.log(object.list[0].weather[0].main);
      let weather = object.list[0].weather[0].description;
      let temperature = object.list[0].main.temp;
      let time = new Date(object.list[0].dt_txt);
      // convert time
      let convertedTime = convertTime(time);

      loadMainIcon(weather, convertedTime);
      loadTime(convertedTime);
      loadTemperature(temperature);

      let futureDays = 5;
      for (i = 1, count = 0; count < futureDays; i++, count++) {
        let futureWeather = object.list[0 + i].weather[0].description;
        let futureTemperature = object.list[o + i].main.temp;
        let futureTime = new Date(object.list[0 + i].dt_txt);
        let convertedFutureTime = convertTime(futureTime);

        loadFutureIcons(futureWeather, convertedFutureTime, i + 2);
        loadFutureTime(convertedFutureTime, i);
        loadFutureTemperature(futureTemperature, i);
      }
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}

// run this code to make request when this script file gets executed
makeCorsRequest();
