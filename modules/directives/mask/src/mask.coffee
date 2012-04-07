module = angular.module('ui.directives')

module.directive 'uiMask', ()->
  require: 'ngModel'
  scope:
    uiMask: 'evaluate'
  link: ($scope, element, attrs, controller)->

    # We override the render method to run the jQuery mask plugin
    controller.$render = ()->
      element.val(controller.$viewValue ? '')
      element.mask($scope.uiMask)

    # Add a parser that extracts the masked value into the model but only if the mask is valid
    controller.$parsers.push (value)->
      isValid = element.data('mask-isvalid')
      controller.$setValidity('mask', isValid)
      if isValid
        element.mask()
      else
        null

    # When the element blurs, update the viewvalue
    element.bind 'blur', ()->
      $scope.$apply ()->
        controller.$setViewValue(element.mask())