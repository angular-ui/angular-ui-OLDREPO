/**
 * General-purpose Event binding. Bind any event not natively supported by Angular
 * Both ui-event-call is used when a string is passed to ui-event
 * Alternatively you can pass an object with keynames for events to ui-event
 * 
 * @example <input ui-event="blur" ui-event-call="myCallbackFunction">
 * @example <input ui-event="{ focus : function(){alert('hi')}, blur : function(){alert('bye')} }">
 * 
 * @param ui-event {string|object literal} The event to bind to as a string or a hash of events with their callbacks
 * @param [ui-event-call] {function(event)} Callback function to execute upon event firing
 * @param [ui-event-data] {object} Optional data to pass to the event callbacks
 */
angular.module('ui.directives').directive('uiEvent', [function() {
	return function(scope, elm, attrs) {
		var events = scope.$eval(attrs.uiEvent),
			data = {};
		if (attrs.uiEventData) {
			data = scope.$eval(attrs.uiEventData);
		}
		if (angular.isString(events)) {
			elm.bind(events, data, scope.$eval(attrs.uiEventCall));
		} else {
			elm.bind(events, data);
		}
	};
}]);
