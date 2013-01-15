/**
 * Purpose to center the map ( requires uiMap ) to the
 * current user's position, based on him geo localization
 *
 * @example <div ui-map='gmap' ui-map-locale='localeOptions'></div>">
 *
 * @param ui-map-locale {object literal}  Hash of property:value to use as options during the geolocalization (optional)
 *
 * More about these options
 * @{@link http://www.w3.org/TR/geolocation-API/#position-options}
 */
angular.module('ui.directives').directive('uiMapLocale', ['$parse', function($parse) {
  var map, options;

  var successCallback = function(position) {
    console.log('Usuário foi geolocalizado com successo: ', position);
    map.setCenter( new google.maps.LatLng(position.coords.latitude, position.coords.longitude) );
  };

  var errorCallback = function(error) {
    var errors = {
      1: 'Permission denied',
      2: 'Position unavailable',
      3: 'Request timeout'
    };

    console.log("uiMapLocale directive couldn't retrieve current localization: " + errors[error]);
  };

  return {
    restrict: 'AC',
    required: '^ui-map',
    priority: -1, //ui-map directive should run first to create the map
    link: function postLink(scope, element, attr) {

      //Only don anything if geolocation is avaliable
      if(navigator.geolocation){
        map = $parse(attr.uiMap)(scope);

        if(!angular.isDefined(map)){
          throw new Error("Can't find the map. uiMapLocale depends on a map in the scope");
        }

        options = {};
        if(attr.uiMapLocale){
          options = $parse(attr.uiMapLocale)(scope);
        }

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
      }
    }
  };
}]);