/*
*  AngularJs Fullcalendar Wrapper for the JQuery FullCalendar
*  API @ http://arshaw.com/fullcalendar/ 
*  
*  Angular Calendar Directive that takes in the [eventSources] nested array object as the ng-model and watches (eventSources.length + eventSources[i].length) for changes. 
*       Can also take in multiple event urls as a source object(s) and feed the events per view.
*       The calendar will watch any eventSource array and update itself when a delta is created  
*       An equalsTracker attrs has been added for use cases that would render the overall length tracker the same even though the events have changed to force updates.
*
*/

angular.module('ui.directives').directive('uiCalendar',['ui.config', '$parse', function (uiConfig,$parse) {
     uiConfig.uiCalendar = uiConfig.uiCalendar || {};       
     //returns calendar     
     return {
        require: 'ngModel',
        restrict: 'A',
          link: function(scope, elm, attrs, $timeout) {
            var sources = scope.$eval(attrs.ngModel);
            var tracker = 0;
            /* returns the length of all source arrays plus the length of eventSource itself */
            var getSources = function () {
              var equalsTracker = scope.$eval(attrs.equalsTracker);
              tracker = 0;
              angular.forEach(sources,function(value,key){
                if(angular.isArray(value)){
                  tracker += value.length;
                }
              });
               if(angular.isNumber(equalsTracker)){
                return tracker + sources.length + equalsTracker;
               }else{
                return tracker + sources.length;
              }
            };
            /* update the calendar with the correct options */
            function update() {
              scope.calendar = elm.html('');
              var view = scope.calendar.fullCalendar('getView');
              var m;
              var xtraOptions = {};
              //calendar object exposed on scope
              if(view){
                var viewDate = new Date(view.start);
                if(viewDate !== 'Invalid Date'){
                  y = viewDate.getFullYear();
                  m = viewDate.getMonth();
                  d = viewDate.getDate();
                  if(!isNaN(y) && !isNaN(m) && !isNaN(d)){
                    xtraOptions = {
                      year: y,
                      month: m,
                      date: d
                    };
                  }
                }
                view = view.name; //setting the default view to be whatever the current view is. This can be overwritten.
              }
              /* If the calendar has options added then render them */
              var expression, 
                   options = { defaultView : view, eventSources: sources };
              if (attrs.uiCalendar) {
                expression = scope.$eval(attrs.uiCalendar);
                // Override defaultView if is set in ui-calendar attribute - OK? 
                if (expression.defaultView) {
                  expression.defaultView = view;
                }     
              } 
              else {
                expression = {};
              }
              angular.extend(options, uiConfig.uiCalendar, expression, xtraOptions);
              scope.calendar.fullCalendar(options);
            }
            update();
              /* watches all eventSources */
              scope.$watch(getSources, function( newVal, oldVal )
              {
                update();
              });
         }
    };
}]);