describe('uiMapLocale', function () {
  var scope, geoPosition;

  beforeEach(module('ui.directives'));
  beforeEach(inject(function ($rootScope) {
    var coods = navigator.geolocation.waypoints[0].coords;
    navigator.geolocation.delay = 100;

    scope = $rootScope.$new();
    geoPosition = new google.maps.LatLng(coods.latitude, coods.longitude);
  }));

  describe('applying beside the ui-map with geolocation enabled', function () {

    it('should pan the map to the current position', function () {
      inject(function ($compile) {

        var ready = false;

        runs(function(){
          scope.gmapOptions = {};
          scope.gmapLocationOptions = {};

          $compile("<div ui-map='gmap' ui-options='gmapOptions' ui-map-locale='gmapLocationOptions'></div>")(scope);

          //waits more than geolocation mock takes
          setTimeout(function(){
            ready = true;
          },200);

        });

        waitsFor(function(){
          return ready;
        });

        runs(function(){
          expect(scope.gmap.getCenter().lat()).toBe(geoPosition.lat());
          expect(scope.gmap.getCenter().lng()).toBe(geoPosition.lng());
        });

      });
    });

  });

});