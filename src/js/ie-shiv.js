// READ: http://docs-next.angularjs.org/guide/ie
(function(){
  
  var getIE = function() {
      // Returns the version of Internet Explorer or a -1
      // (indicating the use of another browser).
     var rv = -1; // Return value assumes failure.
     if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) {
        	rv = parseFloat( RegExp.$1 );
        }
     }
     return rv;
  };

  var tags = [ 'ng-include', 'ng-pluralize', 'ng-view', 'ng:include', 'ng:pluralize', 'ng:view' ];
  var shiv = function() {
    for(var i = 0, len = tags.length; i < len; i++) {
      document.createElement(tags[i]);
    }
  };
	
  var ieVersion = getIE();
  if (ieVersion > -1 && ieVersion < 9) {
    shiv();
  }
  
})();
