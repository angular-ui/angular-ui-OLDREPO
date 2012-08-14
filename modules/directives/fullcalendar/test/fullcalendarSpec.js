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

    describe('compiling this directive and checking for the events', function () {

        //Date Objects needed for events
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

        //These tests pass, but they are not using the correct event object. I need the object inside the isolated scope the fullcaledar has created. 
        it('should excpect to load 4 events to scope', function () {
            
            $compile('<div ui-full-calendar events="' + events + '"></div>')(scope);
            expect(events.length).toBe(4);
        });

        it('should excpect to load 4 events to scope', function () {
            
            $compile('<div ui-full-calendar events="' + events + '"></div>')(scope);
            expect(events[0].title).toBe('All Day Event');
        });

         //The url is set in the directive. Needs to be tested to make sure its there.   //Fails because the events object that is inserted into the directive is still not being tested on. Could use some help here. 
         it('should expect the url to = http://www.angularjs.org', function () {
           
            $compile('<div ui-full-calendar events="' + events + '"></div>')(scope);
            expect(events[0].url).toBe('http://www.angularjs.org');
        });

       });

});