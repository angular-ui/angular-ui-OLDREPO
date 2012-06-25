
###
A masked input widget - allows you to specify a mask of what characters you can enter into the input element.
###
angular.module('ui.directives').directive 'uiMask', ()->
  require: 'ngModel'
  link: ($scope, element, attrs, controller)->
    mask = null

    # Update the placeholder attribute from the mask
    updatePlaceholder = ()->
      if not attrs.placeholder?
        element.attr('placeholder', mask.replace(/9/g, '_'))

    # Render the mask widget after changes to either the model value or the mask
    controller.$render = ()->
      value = controller.$viewValue ? ''
      element.val(value)
      if mask?
        element.mask(mask)
      updatePlaceholder()
    
    # Keep watch for changes to the mask
    attrs.$observe 'uiMask', (maskValue)->
      mask = maskValue
      controller.$render()
    
    # Check the validity of the masked value
    controller.$parsers.push (value)->
      isValid = element.data('mask-isvalid')
      controller.$setValidity('mask', isValid)
      if (isValid)
        element.mask()
      else
        null
    
    # Update the model value everytime a key is pressed on the mask widget
    element.bind 'keyup', ()->
      $scope.$apply ()->
        controller.$setViewValue(element.mask())
