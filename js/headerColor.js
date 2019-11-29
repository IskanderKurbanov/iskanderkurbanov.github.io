setInterval(
	function() {
  $color = generateColor();
  $('header')
    .css('background-color', $color)
  /*$('.Fmenu')
    .css('background-color', $color)*/
}, 3000);

// Generates random color 
function generateColor() {
	let arr = ['#913f3f', '#5a81bf', '#3eab9c', '#a2ab3e', '#9567bf'];
	var i = Math.floor(Math.random() * arr.length);
	return arr[i];
	
  
  //'#' + Math.floor(Math.random() * 16777215).toString(16)
}