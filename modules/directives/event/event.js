
/**
 * General-purpose Event binding. Bind any event not natively supported by Angular
 * Pass an object with keynames for events to ui-event
 * 
 * @example <input ui-event="{ focus : 'counter++', blur : 'someCallback()' }">
 * 
 * @param ui-event {string|object literal} The event to bind to as a string or a hash of events with their callbacks
 */
angular.module('ui.directives').directive('uiEvent', ['$parse',
function($parse) {
	return function(scope, elm, attrs) {
		var events = scope.$eval(attrs.uiEvent);
		angular.forEach(events, function(uiEvent, eventName){
      var fn = $parse(uiEvent);
			elm.bind(eventName, function(evt) {
        var params = Array.prototype.slice.call(arguments);
        //Take out first paramater (event object);
        params = params.splice(1);
				scope.$apply(function() {
          fn(scope, {$event: evt, $params: params})
        });
			});
		});
	};
}]);
