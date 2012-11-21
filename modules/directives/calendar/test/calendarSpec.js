/*global beforeEach, afterEach, describe, it, inject, expect, module, spyOn, fullcalendar, angular, $*/
describe('uiCalendar', function () {
    'use strict';

    var scope, $compile;

    beforeEach(module('ui'));
    beforeEach(inject(function (_$rootScope_, _$compile_) {
        scope = _$rootScope_.$new();
        $compile = _$compile_;

        
          //Date Objects needed for event
          var date = new Date();
          var d = date.getDate();
          var m = date.getMonth();
          var y = date.getFullYear();

          // create an array of events, to pass into the directive. 
          scope.events = [
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
              allDay: true}
          ]; //End of Events Array

          scope.addChild = function() {
            scope.events.push({
              title: 'Click for Google ' + scope.events.length,
              start: new Date(y, m, 28),
              end: new Date(y, m, 29),
              url: 'http://google.com/'
            });
          };

          scope.remove = function(index) {
            scope.events.splice(index,1);
           };
         
    }));

    afterEach(function() {
      angular.module('ui.config').value('ui.config', {}); // cleanup
    });

    describe('compiling this directive and checking for events inside the calendar', function () {


        //test the calendars events length to be 4  
        it('should excpect to load 4 events to scope', function () {
            spyOn($.fn, 'fullCalendar');
            $compile('<div id="uicalendar" ui-calendar="{height: 200, weekends: false}" ng-model="events"></div>')(scope);
            expect($.fn.fullCalendar.mostRecentCall.args[0].events.length).toBe(4);
        });
        //test to check the title of the first event. 
        it('should excpect to be All Day Event', function () {
            spyOn($.fn, 'fullCalendar');
            $compile('<div id="uicalendar" ui-calendar="{height: 200, weekends: false}" ng-model="events"></div>')(scope);
            expect($.fn.fullCalendar.mostRecentCall.args[0].events[0].title).toBe('All Day Event');
        });
        //test to make sure the event has a url assigned to it.
        it('should expect the url to = http://www.angularjs.org', function () {
            spyOn($.fn, 'fullCalendar');
            $compile('<div id="uicalendar" ui-calendar="{height: 200, weekends: false}" ng-model="events"></div>')(scope);
            expect($.fn.fullCalendar.mostRecentCall.args[0].events[0].url).toBe('http://www.angularjs.org');
        });
        //test the 3rd events' allDay field.
        it('should expect the fourth Events all Day field to equal true', function () {
            spyOn($.fn, 'fullCalendar');
            $compile('<div id="uicalendar" ui-calendar="{height: 200, weekends: false}" ng-model="events"></div>')(scope);
            expect($.fn.fullCalendar.mostRecentCall.args[0].events[3].allDay).toNotBe(false);
        });
        //Tests the height of the calendar.
        it('should expect the calendar attribute height to be 200', function () {
            spyOn($.fn, 'fullCalendar');
            $compile('<div id="uicalendar" ui-calendar="{height: 200, weekends: false}" ng-model="events"></div>')(scope);
            //console.log('hello ' + $.fn.fullCalendar.mostRecentCall.args[0]);
            expect($.fn.fullCalendar.mostRecentCall.args[0].height).toEqual(200);
        
        });
        //Tests the weekends boolean of the calendar.
        it('should expect the calendar attribute weekends to be false', function () {
            spyOn($.fn, 'fullCalendar');
            $compile('<div id="uicalendar" ui-calendar="{height: 200, weekends: false}" ng-model="events"></div>')(scope);
            expect($.fn.fullCalendar.mostRecentCall.args[0].weekends).toEqual(false);
        });
        //Test to make sure that when an event is added to the calendar everything is updated with the new event.
        it('should expect the scopes events to increase by 2', function () {
            spyOn($.fn, 'fullCalendar');
            $compile('<div id="uicalendar" ui-calendar="{height: 200, weekends: false}" ng-model="events"></div>')(scope);
            expect($.fn.fullCalendar.mostRecentCall.args[0].events.length).toEqual(4);
            scope.addChild();
            scope.addChild();
            expect($.fn.fullCalendar.mostRecentCall.args[0].events.length).toEqual(6);
        });
        //Test to make sure the calendar is updating itself on changes to events length.
        it('should expect the calendar to update itself with new events', function () {
            spyOn($.fn, 'fullCalendar');
            $compile('<div id="uicalendar" ui-calendar="{height: 200, weekends: false}" ng-model="events"></div>')(scope);
            var clientEventsLength = $.fn.fullCalendar.mostRecentCall.args[0].events.length;
            expect(clientEventsLength).toEqual(4);
            //remove an event from the scope.
            scope.remove(0);
            //events should auto update inside the calendar. 
            clientEventsLength = $.fn.fullCalendar.mostRecentCall.args[0].events.length;
            expect(clientEventsLength).toEqual(3);
        });

       });

});