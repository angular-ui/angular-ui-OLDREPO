# About

This adds support for 2 google maps api3 plugins.

## MarkerClustererPlus

This provides a *significant* performance boost when it comes to dealing with a multitude of markers (making it possible to have thousands of markers): markers that are in close proximity are aggregated into a single cluster/group with the count of markers contained. Google Maps api3 has no native equivalent.

[MarkerClustererPlus Project](http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclustererplus/)

### Important!!

You **MUST** alter the [MCp](http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclustererplus/src/markerclusterer.js) with the following (which does add a dependency on jQuery:

(around line 667)
```js
- function MarkerClusterer(map, opt_markers, opt_options) {
+ function MarkerClusterer(map, opt_markers, opt_optionsG) {
```

and (around line 686)

```js
- opt_options = opt_options || {};
+ var opt_options = jQuery.extend(true, {}, opt_optionsG ) || {};
```

## InfoBox

This is an easier to style alternative to the native InfoWindow.

[InfoBox Project](http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/)

# Use

## Config
```js
app.value('ic.config',
  {
    "map": {
      "clusters": {
        "imagesDir": "path/to/img"
      },
      "infoBox": { … }, // native options, nothing new here
      "map": { … } // native options, nothing new here
    }
  }
);
```

## html

```html
<div
  id="map_container"
  class="view">

  <div ui-if="mapReady">
    
    <div
      id="map"
      ic-map="map.map"
      ic-options="map.options"
    >
      <div id="map_canvas"></div>
      <div
        ic-map-info-box="map.infoBox.one"
        ic-options="{containerId:'infobox_one'}"
      >
        <div
          id="infobox_one"
          ng-include src="'path/to/template.html'"
        ></div>
        <div ic-map-markers="map.data.one"></div>

      </div>

      <div
        ic-map-info-box="map.infoBox.two"
        ic-options="{containerId:'infobox_two'}"
      >
        <div
          id="infobox_two"
          ng-include src="'path/to/otherTemplate.html'"
        ></div>
        <div
          ic-map-clusters="map.data.two"
          ic-options="map.data.two.options"
          ng-model="markers.two"
        ></div>

    </div>

</div>
```