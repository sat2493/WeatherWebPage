bottom = document.getElementById('bottom');

function readMore() {
  let moreText = document.getElementById("bottom");
  let lessText = document.getElementById("top");
  let btnMore = document.getElementById("More");

  btnMore.style.display = "none";
  lessText.style.display = "none";
  moreText.style.display = "inline";
}

function readLess() {
  let moreText = document.getElementById("bottom");
  let lessText = document.getElementById("top");
  let btnLess = document.getElementById('Less');

  btnLess.style.display = "none";
  lessText.style.display = "inline";
  moreText.style.display = "none";
}

function moveBottom (top) {
	// get the turtle element from DOM
	let bottom = document.getElementById("bottom");
	// decrease top
  top--;
	bottom.style.top = top+"%";
	// change position

	return top;
}

function slideUp () {
  // let top start at 300%
  let top = 300;
  let timer = setInterval( function() {
		top = moveBottom(top);
		// stop when you get all the way to the right
		// turn off the alarm clock
		if (top >= 100) {
			clearInterval(timer);
		}
	}, 80);
}
