/**
 * General-purpose jQuery wrapper. Simply pass the plugin name as the expression.
 *
 * It is possible to specify a default set of parameters for each jQuery plugin.
 * Under the jq key, namespace each plugin by that which will be passed to ui-jq.
 * Unfortunately, at this time you can only pre-define the first parameter.
 * @example { jq : { datepicker : { showOn:'click' } } }
 *
 * @param ui-jq {string} The $elm.[pluginName]() to call.
 * @param [ui-options] {mixed} Expression to be evaluated and passed as options to the function
 *     Multiple parameters can be separated by commas
 *    Set {ngChange:false} to disable passthrough support for change events ( since angular watches 'input' events, not 'change' events )
 *
 * @example <input ui-jq="datepicker" ui-options="{showOn:'click'},secondParameter,thirdParameter">
 */
angular.module('ui.directives').directive('uiJq', ['ui.config', function (uiConfig) {
  return {
    restrict: 'A',
    compile: function (tElm, tAttrs) {
      if (!angular.isFunction(tElm[tAttrs.uiJq])) {
        throw new Error('ui-jq: The "' + tAttrs.uiJq + '" function does not exist');
      }
      var options = uiConfig.jq && uiConfig.jq[tAttrs.uiJq];
      return function (scope, elm, attrs) {
        var linkOptions = [], ngChange = 'change';

        if (attrs.uiOptions) {
          linkOptions = scope.$eval('[' + attrs.uiOptions + ']');
          if (angular.isObject(options) && angular.isObject(linkOptions[0])) {
            linkOptions[0] = angular.extend(options, linkOptions[0]);
          }
        } else if (options) {
          linkOptions = [options];
        }
        if (attrs.ngModel && elm.is('select,input,textarea')) {
          if (linkOptions && angular.isObject(linkOptions[0]) && linkOptions[0].ngChange !== undefined) {
            ngChange = linkOptions[0].ngChange;
          }
          if (ngChange) {
            elm.on(ngChange, function () {
              elm.trigger('input');
            });
          }
        }
        elm[attrs.uiJq].apply(elm, linkOptions);
      };
    }
  };
}]);
