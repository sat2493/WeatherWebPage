"strict mode";

// Do a CORS request to get Davis weather hourly forecast

// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {

   let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=Davis,CA,US&units=imperial&APPID=d017b8685a8172e69756f9eb3747c26a"

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
      console.log(JSON.stringify(object, undefined, 2));  // print it out as a string, nicely formatted
      return object;
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}

function getIcon() {
    let json = makeCorsRequest();
    main = json.list[0].weather[0].main;
    switch (main) {
      case null:
        main_img1.src = "../assets/clear-night.svg";
        main_img2.src = "../assets/clear-night.svg";
        break;

      // default = clear
      default:
        let date = Date(json.list[0].dt_txt);
        if (date.getHours() < 12) {
          // write daytime svg
          let main_img1 = document.getElementById("main-img1");
          let main_img2 = document.getElementById("main-img2");
          main_img1.src = "../assets/clear-night.svg";
          main_img2.src = "../assets/clear-night.svg";
        } else {
          // write nighttime svg
          let main_img1 = document.getElementById("main-img1");
          let main_img2 = document.getElementById("main-img2");
          main_img1.src = "../assets/clearsky.svg";
          main_img2.src = "../assets/clearsky.svg";
        }

    }
}

getIcon();
