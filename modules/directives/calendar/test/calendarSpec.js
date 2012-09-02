/*global beforeEach, afterEach, describe, it, inject, expect, module, spyOn, fullcalendar, angular, $*/
describe('uiCalendar', function () {
    'use strict';

    var scope, $compile;
    
    beforeEach(function() {
      //create an empty calendar object. 
      angular.module('ui.config').value('ui.config', {calendar: {}});
    });

    beforeEach(module('ui'));
    beforeEach(inject(function (_$rootScope_, _$compile_) {
        scope = _$rootScope_.$new();
        $compile = _$compile_;
         
    }));

    afterEach(function() {
      angular.module('ui.config').value('ui.config', {}); // cleanup
    });
    
    //Creates a calendar with with two expressions height and weekends
    function createCalendar0(events) {
      scope.events = events || {};
      scope.eventChanged = 0;

      //Date Objects needed for event
      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();

      scope.addChild = function() {
        scope.events.push({
          title: 'Click for Google ' + scope.events.length,
          start: new Date(y, m, 28),
          end: new Date(y, m, 29),
          url: 'http://google.com/'
        });
      
        scope.eventChanged = scope.eventChanged + 1;
      };

      scope.remove = function(index) {
        scope.events.splice(index,1);
        scope.eventChanged = scope.eventChanged + 1;
       };

      $compile('<div ui-calendar="{height: 200, weekends: false}" ng-model="events" changed="eventChanged"></div>')(scope);
    }

    describe('compiling this directive and checking for the events', function () {

      //Date Objects needed for event
      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();

      // create an array of events, to pass into the directive. 
      var events = [
        {
          title: 'All Day Event',
          start: new Date(y, m, 1),
          url: 'http://www.angularjs.org'},
        {
          title: 'Long Event',
          start: new Date(y, m, d - 5),
          end: new Date(y, m, d - 2)},
        {
          id: 999,
          title: 'Repeating Event',
          start: new Date(y, m, d - 3, 16, 0),
          allDay: false},
        {
          id: 999,
          title: 'Repeating Event',
          start: new Date(y, m, d + 4, 16, 0),
          allDay: false}
      ]; //End of Events Array


        //These tests pass because the scope.events object is created by the controller and passed into the directive, where the events are manipulated to fit the certain standards of the calendar.  
        it('should excpect to load 4 events to scope', function () {
            
            createCalendar0(events);
            expect(scope.events.length).toBe(4);
        });
        //test to check the title of the first event. 
        it('should excpect to load 4 events to scope', function () {
            
            createCalendar0(events);
            expect(scope.events[0].title).toBe('All Day Event');
        });
        //test to make sure the event has a url assigned to it.
        it('should expect the url to = http://www.angularjs.org', function () {
           
            createCalendar0(events);
            expect(scope.events[0].url).toBe('http://www.angularjs.org');
        });
        //test the 3rd events' allDay field.
        it('should expect the url to = http://www.angularjs.org', function () {
           
            createCalendar0(events);
            expect(scope.events[3].allDay).toBe(false);
        });
        //Tests the height of the calendar.
        it('should expect the calendar attribute height to be 200', function () {

            spyOn($.fn, 'fullCalendar');
            createCalendar0(events);
          
            //console.log('hello ' + $.fn.fullCalendar.mostRecentCall.args[0]);
            expect($.fn.fullCalendar.mostRecentCall.args[0].height).toEqual(200);
        
        });
        //Tests the weekends boolean of the calendar.
        it('should expect the calendar attribute weekends to be false', function () {

            spyOn($.fn, 'fullCalendar');
            createCalendar0(events);
            expect($.fn.fullCalendar.mostRecentCall.args[0].weekends).toEqual(false);
        });
        //Test to make sure that when an event is added to the calendars updated with the new event.
        it('should expect the scopes events to incease by 1', function () {

            spyOn($.fn, 'fullCalendar');
            createCalendar0(events);
            scope.addChild();
            scope.addChild();
            expect(scope.events.length).toEqual(6);
        });
        //Test to make sure that when an event is removed the calendars events are updated.
        it('should expect the local event array to stay the same', function () {

            spyOn($.fn, 'fullCalendar');
            createCalendar0(events);
            scope.remove(0);
            expect(scope.events.length).toEqual(5);
        });

       });

});