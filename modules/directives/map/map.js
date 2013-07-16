(function () {
  var app = angular.module('ui.directives');

  // Setup map events from a google map object to trigger on a given element,
  // then just use ui-event to catch events from an element
  function bindMapEvents(scope, eventsStr, googleObject, element)
  {
    angular.forEach(eventsStr.split(' '), function (eventName)
    {
      //Prefix all googlemap events with 'map-', so eg 'click' 
      //for the googlemap doesn't interfere with a normal 'click' event
      var $event = { type: 'map-' + eventName };
      google.maps.event.addListener(googleObject, eventName, function (evt)
      {
        element.triggerHandler(angular.extend({}, $event, evt));
        // We create an $apply if it isn't happening--needs better support.
        // Don't want to use timeout because tons of these events fire at once,
        // and we only need one $apply
        if (!scope.$$phase) scope.$apply();
      });
    });
  }

  app.directive('icMap',
    ['ic.config', '$parse',
      function (icConfig, $parse)
      {
        var mapEvents = 'bounds_changed center_changed click dblclick ' +
          'drag dragend dragstart heading_changed idle maptypeid_changed ' +
          'mousemove mouseout mouseover projection_changed resize rightclick ' +
          'tilesloaded tilt_changed zoom_changed';
        var options = icConfig.map || {};

        function controller($scope, $element, $attrs)
        {
          var icOptions = $scope.$eval($attrs.icOptions);
          this.opts = {
            "clusters": angular.extend(
                {}, options.clusters, icOptions.clusters
              ),
            "infoBox": angular.extend(
                {}, options.infoBox, icOptions.infoBox
              ),
            "map": angular.extend(
                {}, options.map, icOptions.map
              ),
            "markers": angular.extend(
                {}, options.markers, icOptions.markers
              )
          };
          $scope.mapId = this.opts.map.mapId || "map_canvas";
          $scope.mapObj = {};
          $scope.mapElm = {};
        }

        function postLink(scope, elm, attrs, controllers)
        {
          var _opts = controllers[0].opts.map;
          scope.mapElm = elm.find("#"+_opts.mapId);
          scope.mapObj = new google.maps.Map(scope.mapElm[0], _opts);
          var model = $parse(attrs.icMap);
          
          // Set scope variable for the map
          model.assign(scope, scope.mapObj);
          bindMapEvents(scope, mapEvents, scope.mapObj, scope.mapElm);
        }

        return {
          priority: 100,
          restrict: 'A',
          require: ['icMap'],
          controller: controller,
          link: postLink
        };
      }
    ]
  );

  app.directive('icMapInfoBox',
    ['ic.config','$parse', '$compile',
      function (icConfig, $parse, $compile)
      {
        var infoBoxEvents = 'closeclick content_change domready ' +
          'position_changed zindex_changed';

        function postLink(scope, elm, attrs, controllers)
        {
          var icOptions = scope.$eval(attrs.icOptions);
          var _opts = angular.extend(
            {}, controllers[0].opts.infoBox, icOptions
          );
          var model = $parse(attrs.icMapInfoBox);
          scope.infoBoxObj = model(scope);
          if ( ! angular.isDefined(_opts.containerId) )
          { _opts.containerId = "infobox_container"; }
          var infoboxElm = elm.find("#"+_opts.containerId);

          if ( !scope.infoBoxObj )
          {
            scope.infoBoxObj = new InfoBox(_opts);
            model.assign(scope, scope.infoBoxObj);
          }
          bindMapEvents(scope, infoBoxEvents, scope.infoBoxObj, infoboxElm);

          // Don't need infobox's template on the DOM anymore--now stored in
          // google maps, so just replace the old element with an empty div.
          //!\\ DO NOT remove it altogether because that can mess up angular
          infoboxElm.replaceWith('<div></div>');

          // Decorate infoBox.open to $compile contents before opening
          var _open = scope.infoBoxObj.open;
          scope.infoBoxObj.open = function open(mapObj, markerObj)
          {
            scope.infoBoxObj.setContent( infoboxElm[0] );
            _open.call(this, mapObj, markerObj);
          };
        }

        return {
          priority: 50,
          restrict: 'A',
          require: ['?^icMap'],
          scope: true,
          link: postLink
        };
      }
    ]
  );

  function addMarkers(map, markers, markerType, options, infobox)
  {
    var markerObjs = [];
    for ( var i = markers.length-1; i >= 0; i-- )
    {
      var latLng = new google.maps.LatLng( markers[i][0] , markers[i][1] );
      var obj = ( markerType == 'native')?
        angular.extend({ map: map, position: latLng }, options) :
        angular.extend({ position: latLng }, options);
      var marker = new google.maps.Marker(obj);
      // if ( markerType == 'native' )
      google.maps.event.addListener(
        marker, 'click', function eventRegister(evt)
        { infobox.open(map, marker); event.stopPropagation(); event.cancelBubble = true; }
      );
      markerObjs[i] = marker;
    }
    if ( markerType == 'native' )
      { return markerObjs; }
    else if ( markerType == 'cluster' )
      { return new MarkerClusterer( map, markerObjs, options ); }
  }

  app.directive('icMapMarkers',
    ['ic.config', '$parse',
      function (icConfig, $parse)
      {
        function postLink(scope, elm, attrs, controllers)
        {
          var _opts = controllers[0].opts.markers;
          var events = 'animation_changed click clickable_changed ' +
            'cursor_changed  dblclick drag dragend draggable_changed ' +
            'dragstart flat_changed icon_changed mousedown mouseout ' +
            'mouseover mouseup position_changed rightclick shadow_changed ' +
            'shape_changed title_changed visible_changed zindex_changed';

          scope.$watch(
            attrs.icMapMarkers,
            function watchMapMarkers(newMarkerArr)
            {
              for(var h = newMarkerArr.length-1; h >= 0; h--)
              {
                var options = newMarkerArr[h].options || {};
                switch(options.status)
                {
                  case 4: var color = 'black'; break;
                  case 3: var color = 'red'; break;
                  case 2: var color = 'orange'; break;
                  case 1: var color = 'yellow'; break;
                  default: var color = 'green';
                }
                _opts.icon = _opts.imagesDir + color + '.svg';
                var natives = addMarkers(
                  scope.mapObj, [newMarkerArr[h].latLng], 'native', _opts, scope.infoBoxObj
                );
                bindMapEvents(scope, events, natives, scope.mapElm);
              }
            }
          );
        }

        return {
          restrict: 'A',
          require: ['?^icMap'],
          priority: 0,
          link: postLink
        };
      }
    ]
  );

  app.directive('icMapClusters',
    ['$parse',
      function ($parse)
      {
        function postLink(scope, elm, attrs, controllers)
        {
          var _opts = controllers[0].opts.clusters;
          var ngModel = controllers[1];
          if ( angular.isDefined(attrs.icOptions) )
            var icOptions = scope.$eval(attrs.icOptions);
          function createStyles(opts)
          {
            for ( var size = opts.styles.length-1; size >= 0; size-- )
            {
              opts.styles[size].url = opts.icon = opts.imagesDir + opts.color + '.svg';
              angular.extend(opts.styles[size], icOptions);
            }
          }
          scope.$watch(
            attrs.icMapClusters,
            function watchMapClusters(newClusterArr)
            {
              var opts = jQuery.extend(true, {}, _opts);
              opts.color = icOptions.color;
              createStyles(opts);
              var clusters = addMarkers(
                scope.mapObj, newClusterArr, 'cluster', opts, scope.infoBoxObj
              );
              ngModel.$setViewValue(clusters);
            },
            true
          );
          scope.$watch(
            attrs.icOptions,
            function watchIcOptions(newOptions, oldOptions)
            {
              if (newOptions !== oldOptions)
              {
                if (
                  angular.isDefined(newOptions.visible)
                  && angular.isDefined(oldOptions.visible)
                  && newOptions.visible !== oldOptions.visible
                  || angular.isDefined(newOptions.visible)
                )
                {
                  var markers = ngModel.$modelValue.markers_;
                  for ( var i = markers.length-1; i >= 0; i-- )
                  {
                    markers[i].setVisible(newOptions.visible);
                  }
                  ngModel.$modelValue.repaint();
                }
              }//fi
            },
            true
          );
        }
        return {
          restrict: 'A',
          require: ['?^icMap','?ngModel'],
          priority: 0,
          link: postLink
        };
      }
    ]
  );
 
// Map overlay directives all work the same. Take map marker for example
// <ui-map-marker="myMarker"> will $watch 'myMarker' and each time it changes,
// it will hook up myMarker's events to the directive dom element. Then
// ui-event will be able to catch all of myMarker's events. Super simple.
  
  function mapOverlayDirective(directiveName, events)
  {
    app.directive(directiveName, [function () {
      return {
        restrict: 'A',
        link: function (scope, elm, attrs)
        {
          scope.$watch(attrs[directiveName], function (newObject)
          {
            bindMapEvents(scope, events, newObject, elm);
          });
        }
      };
    }]);
  }

  /*mapOverlayDirective('uiMapMarker',
    'animation_changed click clickable_changed cursor_changed ' +
      'dblclick drag dragend draggable_changed dragstart flat_changed ' +
      'icon_changed mousedown mouseout mouseover mouseup position_changed ' +
      'rightclick shadow_changed shape_changed title_changed ' +
      'visible_changed zindex_changed');*/
  
  mapOverlayDirective('uiMapPolyline',
    'click dblclick mousedown mousemove mouseout mouseover mouseup rightclick');

  mapOverlayDirective('uiMapPolygon',
    'click dblclick mousedown mousemove mouseout mouseover mouseup rightclick');

  mapOverlayDirective('uiMapRectangle',
    'bounds_changed click dblclick mousedown mousemove mouseout mouseover ' +
      'mouseup rightclick');

  mapOverlayDirective('uiMapCircle',
    'center_changed click dblclick mousedown mousemove ' +
      'mouseout mouseover mouseup radius_changed rightclick');

  mapOverlayDirective('uiMapGroundOverlay',
    'click dblclick');

})();

