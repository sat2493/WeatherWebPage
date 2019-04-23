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
