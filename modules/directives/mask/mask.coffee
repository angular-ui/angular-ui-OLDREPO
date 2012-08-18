###
 Attaches jquery-ui input mask onto input element
###

angular.module('ui.directives').directive 'uiMask', [()->
  require: 'ngModel'
  scope:
    uiMask: '='
  link: ($scope, element, attrs, controller)->

    ### We override the render method to run the jQuery mask plugin ###
    controller.$render = ()->
      value = controller.$viewValue || ''
      element.val(value)
      element.mask($scope.uiMask)

    ### Add a parser that extracts the masked value into the model but only if the mask is valid ###
    controller.$parsers.push (value)->
      isValid = element.data('mask-isvalid')
      controller.$setValidity('mask', isValid)
      element.mask()

    ### When keyup, update the viewvalue ###
    element.bind 'keyup', ()->
      $scope.$apply ()->
        controller.$setViewValue(element.mask())
]
