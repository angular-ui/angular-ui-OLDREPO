###
Angular date widget that wraps around jQuery UI date widget.
###
angular.module('ui.directives').directive 'uiDate', ()->
  require: '?ngModel'
  link: ($scope, element, attrs, ngModelCtrl)->
    updateModel = (value, picker)->
      $scope.$apply ()->
        ngModelCtrl.$setViewValue(element.datepicker("getDate"))

    updateOptions = (options)->
      if options.onSelect?
        # Caller has specified onSelect to call this as well as updating the model
        usersOnSelectHandler = options.onSelect
        options.onSelect = (value, picker)->
          updateModel(value)
          usersOnSelectHandler(value, picker)
      else
        # No onSelect already specified so just update the model
        options.onSelect = updateModel

    if ngModelCtrl?
      # Update the date picker when the model changes
      originalRender = ngModelCtrl.$render
      ngModelCtrl.$render = ()->
        originalRender()
        element.datepicker("setDate", ngModelCtrl.$viewValue)

    attrs.$observe 'uiDate', (value)->
      options = {}
      options = value if angular.isObject(value)
      updateOptions(options) if ngModelCtrl?
      element.datepicker(options)

