// "strict mode";
//
// // Do a CORS request to get Davis weather hourly forecast
//
// // Create the XHR object.
// function createCORSRequest(method, url) {
//   let xhr = new XMLHttpRequest();
//   xhr.open(method, url, true);  // call its open method
//   return xhr;
// }
//
// // adjusts to PST
// function convertTime(time) {
//   let hour = time.getHours();
//   hour += 16;
//   // if we receive a case of 25:00 or greater, adjust
//   if (hour > 24) {
//     hour -= 24;
//   }
//
//   return hour;
// }
//
// function loadMainIcon(weather, convertedTime) {
//   let main_img1 = document.getElementById("main-img");
//
//   switch (weather) {
//     case "scattered clouds":
//       main_img1.src = "../assets/scatteredclouds.svg";
//       break;
//
//     case "broken clouds":
//       main_img1.src = "../assets/brokencloud.svg";
//       break;
//
//     case "few clouds":
//       if (convertedTime < 6 || convertedTime > 18) {
//         main_img1.src = "../assets/fewclouds-night.svg";
//       } else {
//         main_img1.src = "../assets/clearsky.svg";
//       }
//       break;
//
//     case "mist":
//       main_img1.src = "../assets/mist.svg";
//       break;
//
//     case "clear sky":
//       if (convertedTime < 6 || convertedTime > 18) {
//         main_img1.src = "../assets/clear-night.svg";
//       } else {
//         main_img1.src = "../assets/clearsky.svg";
//       }
//       break;
//
//     case "shower rain":
//       main_img1.src = "../assets/showerrain.svg";
//       break;
//
//     case "thunderstorm":
//       main_img1.src = "../assets/showerrain.svg";
//       break;
//
//     case "snow":
//       main_img1.src = "../assets/snow.svg";
//       break;
//
//     default:
//       if (convertedTime < 6 || convertedTime > 18) {
//         main_img1.src = "../assets/rain-night.svg";
//       } else {
//         main_img1.src = "../assets/rain-day.svg";
//       }
//       break;
//   }
// }
//
// function loadTime(convertedTime) {
//   let hour = convertedTime;
//   let ampm = "AM";
//
//   // adjust if necessary
//   if (convertedTime >= 12) {
//     hour -= 12;
//     ampm = "PM";
//   } else if (convertedTime == 0) {
//     hour += 12;
//   }
//   timeOfDay = hour + ampm;
//
//   let time_web = document.getElementById("main-time-web");
//
//   time_web.innerHTML = timeOfDay;
// }
//
// function loadTemperature(temperature) {
//   let temp = Math.trunc(temperature);
//
//   let temperature_web = document.getElementById("main-temperature-web");
//
//   temperature_web.innerHTML = temp + "°";
// }
//
// function loadFutureIcons (futureWeather, convertedFutureTime, i) {
//   let id = "main-img" + i;
//   //console.log(futureWeather);
//   //console.log(id);
//   let main_img = document.getElementById(id);
//
//   switch (futureWeather) {
//     case "scattered clouds":
//       main_img.src = "../assets/scatteredclouds.svg";
//       break;
//
//     case "broken clouds":
//       main_img.src = "../assets/brokencloud.svg";
//       break;
//
//     case "few clouds":
//       if (convertedFutureTime < 6 || convertedFutureTime > 18) {
//         main_img.src = "../assets/fewclouds-night.svg";
//       } else {
//         main_img.src = "../assets/clearsky.svg";
//       }
//       break;
//
//     case "mist":
//       main_img.src = "../assets/mist.svg";
//       break;
//
//     case "clear sky":
//       if (convertedFutureTime < 6 || convertedFutureTime > 18) {
//         main_img.src = "../assets/clear-night.svg";
//       } else {
//         main_img.src = "../assets/clearsky.svg";
//       }
//       break;
//
//     case "shower rain":
//       main_img.src = "../assets/showerrain.svg";
//       break;
//
//     case "thunderstorm":
//       main_img.src = "../assets/showerrain.svg";
//       break;
//
//     case "snow":
//       main_img.src = "../assets/snow.svg";
//       break;
//
//     default:
//       if (convertedFutureTime < 6 || convertedFutureTime > 18) {
//         main_img.src = "../assets/rain-night.svg";
//       } else {
//         main_img.src = "../assets/rain-day.svg";
//       }
//       break;
//   }
// }
//
// function loadFutureTime(futureTime, i) {
//   let hour = futureTime;
//   let ampm = "AM";
//
//   // adjust if necessary
//   if (futureTime >= 12) {
//     hour -= 12;
//     ampm = "PM";
//   }
//
//   timeOfDay = hour + ":00 " + ampm;
//   id = "temp" + i;
//
//   let time = document.getElementById(id);
//
//   time.innerHTML = timeOfDay;
// }
//
// function loadFutureTemperature(futureTemperature, i) {
//   let temp = Math.trunc(futureTemperature);
//   let id = "temperature" + i;
//
//   let temperature = document.getElementById(id);
//
//   temperature.innerHTML = temp + "°";
// }
//
// function getDistanceFromLatLonInMiles(lat1,lon1,lat2,lon2) {
//   var R = 3958.8; // Radius of the earth in miles
//   var dLat = deg2rad(lat2-lat1);  // deg2rad below
//   var dLon = deg2rad(lon2-lon1);
//   var a =
//     Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//     Math.sin(dLon/2) * Math.sin(dLon/2);
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//   var d = R * c; // Distance in miles
//   return d;
// }
//
// function deg2rad(deg) {
//   return deg * (Math.PI/180)
// }
//
// // Make the actual CORS request.
// function makeCorsRequest() {
//   var city = document.getElementById('search-text-box').value;
//   var api;
//
//   console.log(!isNaN(city));
//
//   if(isNaN(city)){ //not a number
//     api = 'http://api.openweathermap.org/data/2.5/forecast/hourly?q=';
//     console.log('city = ' + city);
//   } else {
//     api = 'http://api.openweathermap.org/data/2.5/forecast/hourly?zip=';
//     console.log('zip code = ' + city);
//   }
//
//   var key = '&units=imperial&APPID=2b950a4430a34b6d1dfa6010d8599df8';  //apikey before = 'Davis,CA,US'
//   var url = api + city + ',US' + key;
//
//   // let xhr = createCORSRequest('GET', url);
//
//   // checking if browser does CORS
//   if (!xhr) {
//     alert('CORS not supported');
//     return;
//   }
//
//   // Load some functions into response handlers.
//   xhr.onload = function() {
//     let responseStr = xhr.responseText;  // get the JSON string
//     let object = JSON.parse(responseStr);  // turn it into an object
//
//     // distance from sacramento
//     let lat1 = 38.5454;
//     let lon1 = -121.7446;
//     let lat2 = object.city.coord.lat;
//     let lon2 = object.city.coord.lon;
//
//     let distance = getDistanceFromLatLonInMiles(lat1,lon1,lat2,lon2)
//
//     console.log('distance ' + distance);
//
//     if (distance > 150) {
//       alert('Not found');
//     } else {
//       //console.log(object.list[0].weather[0].main);
//       let weather = object.list[0].weather[0].description;
//       let temperature = object.list[0].main.temp;
//       let time = new Date(object.list[0].dt_txt);
//       // convert time
//       let convertedTime = convertTime(time);
//
//       loadMainIcon(weather, convertedTime);
//       loadTime(convertedTime);
//       loadTemperature(temperature);
//
//       let futureDays = 5;
//       for (i = 1, count = 0; count < futureDays; i++, count++) {
//         let futureWeather = object.list[0 + i].weather[0].description;
//         let futureTemperature = object.list[0 + i].main.temp;
//         let futureTime = new Date(object.list[0 + i].dt_txt);
//         let convertedFutureTime = convertTime(futureTime);
//
//         loadFutureIcons(futureWeather, convertedFutureTime, i);
//         loadFutureTime(convertedFutureTime, i);
//         loadFutureTemperature(futureTemperature, i);
//       }
//     }
//   };
//
//   xhr.onerror = function() {
//     alert('Woops, there was an error making the request.');
//   };
//
//   // Actually send request to server
//   xhr.send();
// }
//
// var mintop = 5;
// var maxtop = -950;
// var time = 1000;
// var timer = null;
// var toggled = false;
//
// // from: https://stackoverflow.com/questions/3795481/javascript-slidedown-without-jquery
// // window.onload = function() {
// //   var upButton = document.getElementById('toggleThis');
// //   var downButton = document.getElementById('toggleThat');
// //   var top = document.getElementById('body');
// //   var bottom = document.getElementById('body');
// //   upButton.onclick = function() {
// //     clearInterval(timer);
// //     bottom.style.display = "flex";
// //     var instancetop = parseInt(bottom.style.top);
// //     var init = (new Date()).getTime();
// //     var top = (toggled = !toggled) ? maxtop : mintop;
// //     var disp = top - parseInt(bottom.style.top);
// //
// //     timer = setInterval(function() {
// //       var instance = (new Date()).getTime() - init;
// //       if (instance <= time) {
// //         var pos = instancetop + Math.floor(disp * instance / time);
// //         bottom.style.top = pos + "px";
// //       } else {
// //         bottom.style.top = top + "px";
// //         clearInterval(timer);
// //       }
// //     }, 1);
// //   };
//
//
//   downButton.onclick = function() {
//     clearInterval(timer);
//     var instancetop = parseInt(bottom.style.top);
//     var init = (new Date()).getTime();
//     var top = (toggled = !toggled) ? maxtop : mintop;
//     var disp = top - parseInt(bottom.style.top);
//
//     timer = setInterval(function() {
//       var instance = (new Date()).getTime() - init;
//       if (instance <= time) {
//         var pos = instancetop + Math.floor(disp * instance / time);
//         bottom.style.top = pos + "px";
//       } else {
//         bottom.style.top = top + "px";
//         clearInterval(timer);
//       }
//     }, 1);
//
//   };
// };
