/*
*  Implementation of JQuery FullCalendar inspired by http://arshaw.com/fullcalendar/
*  
*  Basic Calendar Directive that takes in live events as the ng-model and then calls fullCalendar(options) to render the events correctly. 
*  fullCalendar.js
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
        events: "=ngModel"
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

      var model = $parse($attrs.uiCalendar);
      //render the urls for the events. Adds a link to the event object inserted into the attribute. 
      //This is where the events can be manipulated if need be. 
      for(var i = 0;i < scope.events.length;i++){
        scope.events[i].url =  "http://www.angularjs.org";
      } 
      
      elm.fullCalendar(options);

      //Set events to the scope. 
      model.assign(scope, scope.events); 
    
    }
  };
}]);