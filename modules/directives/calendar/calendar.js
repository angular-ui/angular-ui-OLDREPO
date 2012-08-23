/*
*  Implementation of JQuery FullCalendar 
*  inspired by http://arshaw.com/fullcalendar/ 
*  
*  Basic Calendar Directive that takes in live events as the ng-model and then calls fullCalendar(options) to render the events correctly. 
*  
*  @joshkurz
*/

angular.module('ui.directives').directive('uiCalendar',['ui.config', '$parse', function (uiConfig,$parse) {
    'use strict';

    uiConfig.uiCalendar = uiConfig.uiCalendar || {};              
    //returns the fullcalendar
    return {
      require: 'ngModel',
      restrict : "A",
      replace : true,
      transclude : true,
      scope: {
        events: "=ngModel",
      },
       

    link: function (scope, elm, $attrs, ngModel) {
      var expression,
        options = {
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },

          // add event name to title attribute on mouseover. 
          eventMouseover: function(event, jsEvent, view) {
            if (view.name !== 'agendaDay') {
              (jsEvent.target).attr('title', event.title);
            }
          },
        
          // Calling the events from the scope through the generic ng-model binding attribute. 
          events: scope.events
        };

      if ($attrs.uiCalendar) {
        expression = scope.$eval($attrs.uiCalendar);
      } else {
        expression = {};
      }
      angular.extend(options, uiConfig.uiCalendar, expression);
      //use the options object to create the personalized calendar
      elm.fullCalendar(options);
    
    }
  };
}]);
