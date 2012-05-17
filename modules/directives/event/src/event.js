
/**
 * General-purpose Event binding. Bind any event not natively supported by Angular
 * Both ui-event-call is a required attribute.
 * 
 * @example <input ui-event="blur" ui-event-call="myCallbackFunction">
 * 
 * @param ui-event {string} The event to bind to (can be multiple events separated by a space)
 * @param ui-event-call {function(event)} Callback function to execute upon event firing
 */
angular.module('ui.directives').directive('uiEvent', [function() {
	return function(scope, elm, attrs) {
		elm.bind(attrs.uiEvent, scope.$eval(attrs.uiEventCall));
	};
}]);
