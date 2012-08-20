/*
*  Implementation of JQuery FullCalendar inspired by http://arshaw.com/fullcalendar/
*
*  Calendar Directive that takes in live events as attributes and then calls fullCalendar(attrs) to render the events correctly. 
*  fullCalendar.js
*/

angular.module('ui.directives').directive('uiCalendar',['ui.config', '$parse', function (uiConfig,$parse) {
    'use strict';

    uiConfig.uiCalendar = uiConfig.uiCalendar || {}              
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

          // add event name to title attribute on mouseover. Dont really need this, but its cool. 
          eventMouseover: function(event, jsEvent, view) {
            if (view.name !== 'agendaDay') {
              $(jsEvent.target).attr('title', event.title);
            }
          },
        
          // Calling the events from the scope.  :)
          events: scope.events,
        };

      var model = $parse($attrs.uiCalendar);
      //render the urls for the events. Adds a link to the event object inserted into the attribute. 
      //This is where the events can be manipulated if need be. 
      for(var i = 0;i < scope.events.length;i++){
        scope.events[i].url =  "http://www.angularjs.org";
      } 

      if ($attrs.uiCalendar) {
        expression = scope.$eval($attrs.uiCalendar);
      } else {
        expression = {};
      }
      angular.extend(options, uiConfig.uiCalendar, expression);
      
      elm.fullCalendar(options);

      //Set events to the scope. 
      model.assign(scope, scope.events); 
    
    }
  };
}]);