
let imageArray = []  // global variable to hold stack of images for animation
let count = 0;          // global var

function addToArray(newImage) {
	if (count < 10) {
		newImage.id = "doppler_"+count;
		newImage.style.display = "none";
		imageArray.push(newImage);
		count = count+1;

		if (count >= 10) {
			console.log("Got 10 doppler images");
			addTenImages();

		}
	}
}

function tryToGetImage(dateObj) {
	let dateStr = dateObj.getUTCFullYear();
	dateStr += String(dateObj.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
	dateStr += String(dateObj.getUTCDate()).padStart(2, '0');

	let timeStr = String(dateObj.getUTCHours()).padStart(2,'0')
	timeStr += String(dateObj.getUTCMinutes()).padStart(2,'0');

	let filename = "DAX_"+dateStr+"_"+timeStr+"_N0R.gif";
	let newImage = new Image();
	newImage.onload = function () {
		// console.log("got image "+filename);
		addToArray(newImage);
	}
	newImage.onerror = function() {
		// console.log("failed to load "+filename);
	}
	newImage.src = "http://radar.weather.gov/ridge/RadarImg/N0R/DAX/"+filename;
}

function getTenImages() {
	let dateObj = new Date();  // defaults to current date and time
	// if we try 150 images, and get one out of every 10, we should get enough
	for (let i = 0; i < 150; i++) {
		newImage = tryToGetImage(dateObj);
		dateObj.setMinutes( dateObj.getMinutes()-1 ); // back in time one minute
	}
}

function addTenImages() {
	var radar = document.getElementById("radar");

	for (let i = 0; i < 10; i++) {
		//console.log("Reached 0th image again");
		newImage = imageArray[i];
		radar.insertBefore(newImage, radar.childNodes[1]);
	}
}

function displayTenImages() {
	// initial conditions
	let i = 9;
	var timer = null;

	function traverseOneFrame() {
		console.log(i);
		let currImage = imageArray[i];
		let lastImage = imageArray[0];
		if (i == 9) { // begin loop
			currImage.style.display = "inline";
			lastImage.style.display = "none";
			return;
		}
		let prevImage = imageArray[i + 1];
		// swap img displays;
		prevImage.style.display = "none";
		currImage.style.display = "inline";
	}

	timer = setInterval(function() {
		traverseOneFrame();
		i--;
		// reset to earliest frame
		if (i < 0) {
			i = 9;
		}
	}, 1000);


}

//var elem = document.getElementById("myAnimation");
//var button = document.getElementById("button");

getTenImages();
displayTenImages();
