let imageArray = []  // global variable to hold stack of images for animation
let count = 0;          // global var

function addToArray(newImage) {
	if (count < 10) {
		newImage.id = "doppler_"+count;
		newImage.style.display = "none";
		imageArray.push(newImage);
		count = count+1;

		if (count >= 10) {
			// right after loading 10 images add them to html
			addTenImages();
		}
	}
}

function tryToGetImage(dateObj) {
	let dateStr = dateObj.getUTCFullYear();
	dateStr += String(dateObj.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
	dateStr += String(dateObj.getUTCDate()).padStart(2, '0');

	let timeStr = String(dateObj.getUTCHours()).padStart(2,'0');
	timeStr += String(dateObj.getUTCMinutes()).padStart(2,'0');

	let filename = "DAX_"+dateStr+"_"+timeStr+"_N0R.gif";
	let newImage = new Image();
	newImage.onload = function () {
		// console.log("got image "+filename);
		addToArray(newImage);
	};
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
	var radar1 = document.getElementById("radar1");;

	for (let i = 0; i < 10; i++) {
		newImage = imageArray[i];
		//newImage1 = imageArray[i];
		// insert img object inside web div
		radar.insertBefore(newImage, radar.childNodes[1]);
		// insert img object inside tablet div
	//	radar1.insertBefore(newImage1, radar1.childNodes[1]);
	}
}

function displayTenImages() {
	// initial conditions
	let i = 9;
	var timer = null;

	// move onto the next frame
	function traverseOneFrame() {
		//console.log(i);
		let currImage = imageArray[i];
		let lastImage = imageArray[0];
		if (i == 9) { // start with the earliest img
			currImage.style.display = "inline";
			lastImage.style.display = "none";
			return;
		}
		let prevImage = imageArray[i + 1];
		// swap img displays of current and previous imgs;
		prevImage.style.display = "none";
		currImage.style.display = "inline";
	}

	timer = setInterval(function() {
		traverseOneFrame();
		i--;
		if (i < 0) { // after going through array, start from earliest image again
			i = 9;
		}
	}, 1000);
}

// first get and compile ten images
getTenImages();
// then display them
displayTenImages();




let imageArray1 = []  // global variable to hold stack of images for animation
let count1 = 10;          // global var

function addToArray1(newImage1) {
	if (count1 < 20) {
		newImage1.id = "doppler_"+count1;
		newImage1.style.display = "none";
		imageArray1.push(newImage1);
		count1 = count1+1;

		if (count1 >= 20) {
			// right after loading 10 images add them to html
			addTenImages1();
		}
	}
}

function tryToGetImage1(dateObj1) {
	let dateStr1 = dateObj1.getUTCFullYear();
	dateStr1 += String(dateObj1.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
	dateStr1 += String(dateObj1.getUTCDate()).padStart(2, '0');

	let timeStr1 = String(dateObj1.getUTCHours()).padStart(2,'0');
	timeStr1 += String(dateObj1.getUTCMinutes()).padStart(2,'0');

	let filename1 = "DAX_"+dateStr1+"_"+timeStr1+"_N0R.gif";
	let newImage1 = new Image();
	newImage1.onload = function () {
		// console.log("got image "+filename);
		addToArray1(newImage1);
	};
	newImage1.onerror = function() {
		// console.log("failed to load "+filename);
	}
	newImage1.src = "http://radar.weather.gov/ridge/RadarImg/N0R/DAX/"+filename1;
}

function getTenImages1() {
	let dateObj1 = new Date();  // defaults to current date and time
	// if we try 150 images, and get one out of every 10, we should get enough
	for (let i = 0; i < 150; i++) {
		newImage1 = tryToGetImage1(dateObj1);
		dateObj1.setMinutes( dateObj1.getMinutes()-1 ); // back in time one minute
	}
}

function addTenImages1() {
	var radar1 = document.getElementById("radar1");;

	for (let i = 0; i < 10; i++) {
		newImage1 = imageArray1[i];
		//newImage1 = imageArray[i];
		// insert img object inside web div
		radar1.insertBefore(newImage1, radar1.childNodes[1]);
		// insert img object inside tablet div
	//	radar1.insertBefore(newImage1, radar1.childNodes[1]);
	}
}

function displayTenImages1() {
	// initial conditions
	let i = 9;
	var timer1 = null;

	// move onto the next frame
	function traverseOneFrame1() {
		//console.log(i);
		let currImage1 = imageArray1[i];
		let lastImage1 = imageArray1[0];
		if (i == 9) { // start with the earliest img
			currImage1.style.display = "inline";
			lastImage1.style.display = "none";
			return;
		}
		let prevImage1 = imageArray1[i + 1];
		// swap img displays of current and previous imgs;
		prevImage1.style.display = "none";
		currImage1.style.display = "inline";
	}

	timer1 = setInterval(function() {
		traverseOneFrame1();
		i--;
		if (i < 0) { // after going through array, start from earliest image again
			i = 9;
		}
	}, 1000);
}

// first get and compile ten images
getTenImages1();
// then display them
displayTenImages1();
