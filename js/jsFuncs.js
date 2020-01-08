window.onload = HSize;

setInterval(
	function() {
  $color = generateColor();
  $color1 = generateColor1();
  $('header').css('background-color', $color);
  $('#arrowTop').css('color', $color);
  $('.SSmenu a').css('color', $color);
  $('main .galleryBox').css('background', $color1);
  /*$('main .Profile-info').css('background', $color1);*/
}, 3000);

function generateColor() {
	let arr = ['#913f3f', '#5a81bf', '#3eab9c', '#a2ab3e', '#9567bf', '#bab525','#00b59d'];
	var i = Math.floor(Math.random() * arr.length);
	return arr[i];
}

function generateColor1() {
  let arr = ['edcaca','ceddf5','ace3db','e4e8b7','cab4de','e0dfb1','a3c7c2'];
  var i = Math.floor(Math.random() * arr.length);
  return '#' + arr[i];
}

function HSize() {
  $('header').css('height', document.documentElement.clientHeight)
}

function view(n, v) {
    style = document.getElementById(n).style;
    styleList = document.getElementById(v).style;
    style.display = (style.display == 'block') ? 'none' : 'block';
    styleList.listStyleType = ( styleList.listStyleType == 'circle') ? 'disc ' : 'circle';
}

arrowTop.onclick = function(){window.scrollTo(pageXOffset, 0)}
window.addEventListener('scroll', function(){arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight);})
window.addEventListener('scroll', function(){menuSlide.hidden = (pageYOffset < document.documentElement.clientHeight);})