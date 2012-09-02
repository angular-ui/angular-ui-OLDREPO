    /*
*  Implementation of JQuery FullCalendar 
*  inspired by http://arshaw.com/fullcalendar/ 
*  
*  Basic Angular Calendar Directive that takes in live events as the ng-model and watches that event array for changes, to update the view accordingly. 
*  
* Authors
*  @andyjoslin
*  @joshkurz
*/

angular.module('ui.directives').directive('uiCalendar',['ui.config', '$parse', function (uiConfig,$parse) {

    uiConfig.uiCalendar = uiConfig.uiCalendar || {};    
    //returns the calendar     
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
          eventChanged: "=changed",
          events: "=ngModel"
        },
        link: function(scope, elm, $attrs) {
            var ngModel = $parse($attrs.ngModel);
            //update method that is called on load and whenever the events array is changed. 
            function update() {
            //Default View Options
            var expression,
              options = {
                header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
              },
            // add event name to title attribute on mouseover. Would be nice if this was an angular popover. 
            eventMouseover: function(event, jsEvent, view) {
            if (view.name !== 'agendaDay') {
              $(jsEvent.target).attr('title', event.title);
             }
            },
        
            // Calling the events from the scope through the ng-model binding attribute. 
            events: ngModel(scope)
            };          
            //if attrs have been entered to directive, then create a relative expression. 
            if ($attrs.uiCalendar)
              expression = scope.$eval($attrs.uiCalendar);
            else 
              expression = {};
              //extend the options to suite the custom directive.
              angular.extend(options, uiConfig.uiCalendar, expression);
              //call fullCalendar from an empty html tag, to keep angular happy.
              elm.html('').fullCalendar(options);
            }
            //on load update call.
            update();
            //watch for changes to the eventChanged object passed into the directive, and update if changed. 
            scope.$watch(function() {
                return scope.eventChanged;
            }, function() {
                update();
            },true);
        }
    };
}]);
