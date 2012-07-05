/**
 * General-purpose Event binding. Bind any event not natively supported by Angular
 * Pass an object with keynames for events to ui-event
 * 
 * @example <input ui-event="{ focus : 'counter++', blur : 'someCallback()' }">
 * 
 * @param ui-event {string|object literal} The event to bind to as a string or a hash of events with their callbacks
 */
angular.module('ui.directives').directive('uiEvent', [function() {
	return function(scope, elm, attrs) {
		var events = scope.$eval(attrs.uiEvent);
		angular.forEach(events, function(event, key){
			elm.bind(key, function() {
				scope.$apply(event);
			});
		});
	};
}]);
