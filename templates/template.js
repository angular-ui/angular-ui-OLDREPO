angular.module('ui.directives').directive('uiTemplate', ['uiConfig', function(uiConfig) {
  return {
    restrict: 'EAC', // supports using directive as element, attribute and class
    require: '?ngModel', // supports hanging optional ng-model as attribute for two-way data binding   
    link: function($scope, element, attrs, controller) {
      var controllerOptions, options, value = '';
      
      // NOTE: angular.extends does not behave the way I expect it to. Need to research more. 
      
      /* pull in your controller options
         1. check ui-options
         2. check uiTemplateOptions in scope
         3. set to empty hash
      */
      controllerOptions = $scope[attrs.options] || $scope.uiTemplateOptions || {};
      
      /* setup options by looking at each attribute on element, and 
       * if not there, check the controller options
       * or set to some default value
      */
      options = {
        someattr: attrs.someattr || controllerOptions.someattr || 'someDefaultValue'
      };
      
      // below is simplistic, but could do stuff, see ui-currency
      var renderView = function(value) {
        element.text(value);
      }
      
      // if you find a controller use this to do your rendering
      // NOTE: you must call controller.$render 
      if (controller != null) {
        controller.$render = function() {
          // ensure element has the controller's view value
          // TODO: find out from Pete what cases this is needed (see uiMask)
          var modelValue = controller.$viewValue;
          element.val(modelValue != null ? modelValue: ''); 
          renderView(controller.$viewValue);
        };
      } else {
        // grab value from model
        renderView($scope[attrs.somemodel] || '');
      } 
    }
  };
}]);

