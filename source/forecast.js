function disappear() {
  var Chck = document.getElementById('ViewCollapse');
  if (Chck.innerHTML == "Read more →") {
      document.getElementById('container-two').style.display = 'inline';
      document.getElementById('footer').style.display = 'flex';
      document.getElementById('ViewCollapse').style.visibility = "hidden"
  }
}
function appear() {
  var Chck = document.getElementById('UnViewCollapse');
  if (Chck.innerHTML == "Read less →") {
      document.getElementById('container-two').style.display = 'none';
      document.getElementById('footer').style.display = 'none';
      document.getElementById('ViewCollapse').style.visibility = "visible"
  }
}
