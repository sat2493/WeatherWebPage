var mintop = 5;
var maxtop = 1000;
var time = 1000;
var timer = null;
var toggled = false;

// from: https://stackoverflow.com/questions/3795481/javascript-slidedown-without-jquery
window.onload = function() {
  var controller = document.getElementById('toggleThis');
  var content = document.getElementById('content')
  controller.onclick = function() {
    clearInterval(timer);
    var instancetop = parseInt(content.style.top);
    var init = (new Date()).getTime();
    var top = (toggled = !toggled) ? maxtop : mintop;

    var disp = top - parseInt(content.style.top);


    timer = setInterval(function() {
      var instance = (new Date()).getTime() - init;
      if (instance <= time) {
        var pos = instancetop + Math.floor(disp * instance / time);;
        content.style.top = pos + "px";
      } else {
        content.style.top = top + "px";
        clearInterval(timer);
        controller.value = toggled ? 'Click Here' : 'Click Here Again';
      }
    }, 1);


  };
};
