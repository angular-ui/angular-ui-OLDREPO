(function() {

  angular.module('ui.directives.date', []).directive('uiDate', function() {
    return {
      require: '?ngModel',
      scope: {
        uiDate: 'evaluate'
      },
      link: function($scope, element, attrs, controller) {
        var originalRender, updateModel, usersOnSelectHandler;
        if ($scope.uiDate == null) $scope.uiDate = {};
        if (controller != null) {
          updateModel = function(value, picker) {
            return $scope.$apply(function() {
              return controller.$setViewValue(element.datepicker("getDate"));
            });
          };
          if ($scope.uiDate.onSelect != null) {
            usersOnSelectHandler = $scope.uiDate.onSelect;
            $scope.uiDate.onSelect = function(value, picker) {
              updateModel(value);
              return usersOnSelectHandler(value, picker);
            };
          } else {
            $scope.uiDate.onSelect = updateModel;
          }
          originalRender = controller.$render;
          controller.$render = function() {
            originalRender();
            return element.datepicker("setDate", controller.$viewValue);
          };
        }
        return element.datepicker($scope.uiDate);
      }
    };
  });

}).call(this);
