setInterval(
	function() {
  $color = generateColor();
  $('header')
    .css('background-color', $color)
}, 3000);
function generateColor() {
	let arr = ['#913f3f', '#5a81bf', '#3eab9c', '#a2ab3e', '#9567bf', '#bab525','#00b59d'];
	var i = Math.floor(Math.random() * arr.length);
	return arr[i];
}
function view(n, v) {
    style = document.getElementById(n).style;
    styleList = document.getElementById(v).style;
    style.display = (style.display == 'block') ? 'none' : 'block';
    styleList.listStyleType = ( styleList.listStyleType == 'circle') ? 'disc ' : 'circle';
}