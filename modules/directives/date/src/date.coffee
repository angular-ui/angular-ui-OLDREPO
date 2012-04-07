angular.module('ui.directives.date').directive 'uiDate', ()->
  require: '?ngModel'
  scope:
    uiDate: 'evaluate'
  link: ($scope, element, attrs, controller)->
    $scope.uiDate ?= {}

    # If we have a controller (i.e. ngModelController) then wire it up
    if controller?
      updateModel = (value, picker)->
        $scope.$apply ()->
          controller.$setViewValue(element.datepicker("getDate"))

      if $scope.uiDate.onSelect?
        # Caller has specified onSelect to call this as well as updating the model
        usersOnSelectHandler = $scope.uiDate.onSelect
        $scope.uiDate.onSelect = (value, picker)->
          updateModel(value)
          usersOnSelectHandler(value, picker)
      else
        # No onSelect already specified so just update the model
        $scope.uiDate.onSelect = updateModel

      # Update the date picker when the model changes
      originalRender = controller.$render
      controller.$render = ()->
        originalRender()
        element.datepicker("setDate", controller.$viewValue)

    # Create the datepicker widget
    element.datepicker($scope.uiDate)

