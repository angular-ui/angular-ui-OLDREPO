function getIE() {
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}
var ieVersion = getIE();
if (ieVersion > -1 && ieVersion < 9) {
	shiv();
}
function shiv() {
	//foreach tag in tags
	{
		document.createElement(tag);
	}
}
var tags = [
	'ng-include', 'ng-pluralize', 'ng-view'
];
