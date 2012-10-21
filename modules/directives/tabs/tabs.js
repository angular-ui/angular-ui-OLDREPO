/**
 * Adds a twitter bootstrap tab for all direct child elements.
 *
 * @param [options] {mixed} Can be an object with multiple options, or a string with the animation class
 *    class {string} the CSS class(es) to use. For example, 'ui-hide' might be an excellent alternative class.
 * @example <li ui-tabs="{tab1:{label:'This is the first tab'}, tab2:{label: 'this is the second tab'}}">
 * <div>content of tab1</div>
 * <div>content of tab2</div>
 * </li>
 */
angular.module('ui.directives').directive('uiTabs', ['$compile', function ($compile) {

  'use strict';

  var getTabDefinitions = function (scope, attrs) {
    var tabs = scope.$eval(attrs.uiTabs);
    
    if (!tabs)
      throw new Error("The ui-tabs directive requires an initialization object in the form of ui-tabs=\"{ tab1 : {label:'label text 1'}, tab2: {label:'label text 1'} }\". Did you forget to set the attributes value?");

    return tabs;
  };

  return {
    link: function (scope, element, attrs, controller) {

      var tabs = getTabDefinitions(scope, attrs);
      var children = $('> *', element);

      var html = "";
      var tabArray = [];
      var index = 0;
      var currentTab = null;
      $.each(tabs, function (prop, tab) {
        tab.activate = function () {
          var _this = this;
          $.each(tabs, function (p, val) {
            if (val.active = (val === _this)) {
              currentTab = val;
              val.element.show();
            }
            else
              val.element.hide();
          });
        };
        tabArray.push(prop);
        tab.element = $(children[index++]);
        html += "<li ng-class='{active:tabs." + prop + ".active}'><a ng-click='tabs." + prop + ".activate()'>{{tabs." + prop + ".label}}</a></li>";
      });

      if (tabArray.length !== children.length) throw new Error("The uiTabs attribute declared " + tabArray.length + " tabs, but contains " + children.length + " child elements.");
      var activeCount = $.grep(tabArray, function (v) { return tabs[v].active; }).length;

      if (activeCount > 1) {
        throw new Error('Can only activate one tab at a time. Tab definitions indicate ' + activeCount + ' active tabs.');
      }
      else if (activeCount === 1){
        tabs[$.grep(tabArray, function (v) { return tabs[v].active; })[0]].activate();
      }
      else {
        $.each(tabArray, function (i, v) {
          if (i === 0) tabs[v].activate();
        });
      }
      
      scope.tabs = tabs;
      element.prepend($compile("<ul class='nav nav-tabs'>" + html + "</ul>")(scope));
    }
  };
}]);
