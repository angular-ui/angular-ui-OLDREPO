/*
*  AngularJs Fullcalendar Wrapper for the JQuery FullCalendar
*  API @ http://arshaw.com/fullcalendar/ 
*  
*  Angular Calendar Directive that takes in the eventSources nested array object as the ng-model and watches an object named events for changes, 
*  to update the view accordingly. Can also take in multiple event urls as a source object(s) and feed the events per view.
*
*
*  The calendar must have an object named events on the scope to update itself properly when the events array is altered from outside of the calendar.  
*
*/

angular.module('ui.directives').directive('uiCalendar',['ui.config', '$parse', function (uiConfig,$parse) {
    uiConfig.uiCalendar = uiConfig.uiCalendar || {};       
     //returns calendar     
     return {
        require: 'ngModel',
        restrict: 'A',
         link: function(scope, elm, attrs) {
            //update the calendar with the correct options
            function update() {
            var view;
            if(elm.fullCalendar('getView')){
              //setting the default view to be whatever the current view is. This can be overwritten. 
              view = elm.fullCalendar('getView').name;
            }
            //If the calendar has options added then render them.
            var expression,
              options = {
                defaultView : view,
                eventSources: scope.$eval(attrs.ngModel)
              };
            if (attrs.uiCalendar) {
              expression = scope.$eval(attrs.uiCalendar);
                //if header has not been included then render default header options
                if(!expression.hasOwnProperty('header')){
                  expression.header = {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                  };
                }
             } else {
              expression = {};
             }
             angular.extend(options, uiConfig.uiCalendar, expression);
             elm.html('').fullCalendar(options);
            }
            update();
            scope.$watch('events.length', function( newVal, oldVal )
            {
              update();
            }, true );
        }
    };
}]);