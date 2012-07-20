(function() {

  //Setup map events from a google map object to trigger on a given element too,
  //then we just use ui-event to catch events from an element
  function bindMapEvents(scope, eventsStr, googleObject, element) {
    angular.forEach(eventsStr.split(' '), function(eventName) {
      var $event = { type: 'map-'+eventName };
      google.maps.event.addListener(googleObject, eventName, function(evt) {
        angular.extend($event, evt);
        element.trigger($event);
        //We create an $apply if it isn't happening. we need better support for this
        //We don't want to use timeout because tons of these events fire at once,
        //and we only need one $apply
        if (!scope.$$phase) scope.$apply();
      });
    });
  };

  angular.module('ui.directives')
  .directive('uiMap', ['ui.config', '$parse', function(uiConfig, $parse) {

    var mapEvents = 'bounds_changed center_changed click dblclick drag dragend '+
  'dragstart heading_changed idle maptypeid_changed mousemove mouseout '+
  'mouseover projection_changed resize rightclick tilesloaded tilt_changed '+
  'zoom_changed';
    var options = uiConfig.map || {};
    
    return {
      restrict: 'A',
      //doesn't work as E for unknown reason
      link: function(scope, elm, attrs) {
        var opts = angular.extend({}, options, scope.$eval(attrs.uiOptions));
        var map = new google.maps.Map(elm[0], opts);
        var model = $parse(attrs.uiMap);
    
        //Set scope variable for the map
        model.assign(scope, map); 
    
        bindMapEvents(scope, mapEvents, map, elm);
      }
    };
  }])

  .directive('uiMapInfoWindow', 
  ['ui.config', '$parse', '$compile', function(uiConfig, $parse, $compile) {
    
    var infoWindowEvents = 'closeclick content_change domready '+
    'position_changed zindex_changed';
    var options = uiConfig.mapInfoWindow || {};
    
    return {
      link: function(scope, elm, attrs) {
        var _open;
        var opts = angular.extend({}, options, scope.$eval(attrs.uiOptions));
        opts.content = elm[0];
        var model = $parse(attrs.uiMapInfoWindow);
        var infoWindow = model(scope);

        if (!infoWindow) {
          infoWindow = new google.maps.InfoWindow(opts);
          model.assign(scope, infoWindow);
        }

        bindMapEvents(scope, infoWindowEvents, infoWindow, elm);
        
        //The info window element doesn't need to stay in the DOM, 
        //so we take it out. but we can't just remove an element from the dom
        //or angular will mess up. so we replace it with an empty div
        elm.replaceWith('<div></div>');

        //Each time info window opens, re-$compile the contents
        _open = infoWindow.open;
        infoWindow.open = function(arg1,arg2,arg3,arg4,arg5,arg6) {
          $compile(elm.contents())(scope);
          _open.call(infoWindow, arg1,arg2,arg3,arg4,arg5,arg6); 
        }
      }
    };
  }]);

  //ui-marker directive
  //This finds a marker on the scope matching the ui-marker given.
  //eg <ui-marker="myMarker"> will look for scope.myMarker and hook up to it,
  //allowing events to be dispatched to myMarker
  .directive('uiMarker', ['ui.config', '$parse', function(uiConfig, $parse) {
    
    var markerEvents = 'animation_changed click clickable_changed cursor_changed '+
    'dblclick drag dragend draggable_changed dragstart flat_changed icon_changed '+
    'mousedown mouseout mouseover mouseup position_changed rightclick '+
    'shadow_changed shape_changed title_changed visible_changed zindex_changed';
    
    return {
      restrict: 'A',
      link: function(scope, elm, attrs) {
        
        function setupMarker(marker) {
          bindMapEvents(scope, markerEvents, marker, elm);
        }
        
        //Once someone sets scope[attrs.uiMarker], hook it up to this element
        scope.$watch(attrs.uiMarker, function(newMarker) {
          if (newMarker) setupMarker(newMarker);
        });
      } 
    }
  }]);

})();