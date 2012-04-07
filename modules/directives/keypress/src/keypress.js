
/**
 * Bind an event to the 'return' keypress
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/

angular.module('ui.directives').directive('uiKeypress', [function(){
	return function(scope, elm, attrs) {
		var params = scope.$eval( '[' + attrs.uiKeypress + ']' );
		params[1] = params[1] || angular.noop();
		elm.bind('keypress', function(event){
			if (event.keyCode == params[0]){
				params[1](event);
				scope.$apply();
			}
		});
	};
}]);