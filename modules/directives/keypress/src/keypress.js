
/**
 * Bind an event to a particular keypress
 * @param hash {object} keyCode The number keycode to watch (ex: 13 is the return key). The callback function to fire upon keypress. Takes an 'event' param
 * @example <input ui-keypress="{ 13 : someCallback }">
 **/
angular.module('ui.directives').directive('uiKeypress', [function(){
	return {
		link: function(scope, elm, attrs) {
			var params = scope.$eval(attrs.uiKeypress);
			elm.bind('keypress', function(event){
				if (params[event.keyCode]){
					scope.$apply(function(){
						params[event.keyCode](event);
					});
				}
			});
		}
	};
}]);