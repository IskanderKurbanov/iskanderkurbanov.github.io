function view(n, v) {
    style = document.getElementById(n).style;
    styleList = document.getElementById(v).style;
    style.display = (style.display == 'block') ? 'none' : 'block';
    styleList.listStyleType = ( styleList.listStyleType == 'circle') ? 'disc ' : 'circle';
}