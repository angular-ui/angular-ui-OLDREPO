/*global beforeEach, afterEach, describe, it, inject, expect, module, spyOn, fullcalendar, angular, $*/
describe('fullCalendar', function () {
    'use strict';

    var scope, $compile;
    
    beforeEach(function() {
        //create an empty fullCalendar object. 
        angular.module('ui.config').value('ui.config', {fullcalendar: {}});
    });

    beforeEach(module('ui'));
    beforeEach(inject(function (_$rootScope_, _$compile_) {
        scope = _$rootScope_.$new();
        $compile = _$compile_;
         
    }));

    afterEach(function() {
        angular.module('ui.config').value('ui.config', {}); // cleanup
    });

    function createFullCalendar(events) {
    scope.events = events || {};
    console.log(angular.toJson(events));
    $compile("<div full-calendar='calendarEvents' events='events'></div>")(scope);
  };

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
            start: new Date(y, m, 1)},
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
            ]

        //These tests fail because the scope.calendarEvents object that is supposed to be created is comming up as undefined.  
        it('should excpect to load 4 events to scope', function () {
            
            createFullCalendar(events);
            console.log('hello   :   ' + scope.calendarEvents)
            expect(scope.calendarEvents.length).toBe(4);
        });

        it('should excpect to load 4 events to scope', function () {
            
            createFullCalendar(events);
            expect(scope.calendarEvents[0].title).toBe('All Day Event');
        });

         it('should expect the url to = http://www.angularjs.org', function () {
           
            createFullCalendar(events);
            expect(scope.calendarEvents[0].url).toBe('http://www.angularjs.org');
        });

         it('should bind fullcalendar object to scope', function() {
           createFullCalendar(events);
           expect(scope.calendarEvents).toBeTruthy();
         });

       });

});