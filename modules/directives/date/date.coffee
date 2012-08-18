
###
 jQuery UI Datepicker plugin wrapper
 
 @param [ui-date] {object} Options to pass to $.fn.datepicker() merged onto ui.config
###
angular.module('ui.directives').directive 'uiDate', ['ui.config', (uiConfig)->
  options = {};
  if uiConfig.date?
    angular.extend(options, uiConfig.date)

  require: '?ngModel',
  link: (scope, element, attrs, controller)->
    opts = angular.extend({}, options, scope.$eval(attrs.uiDate));

    ### If we have a controller (i.e. ngModelController) then wire it up ###
    if controller?
      updateModel = (value, picker)->
        scope.$apply ()->
          controller.$setViewValue(element.datepicker("getDate"))

      if opts.onSelect?
        ### Caller has specified onSelect to call this as well as updating the model ###
        usersOnSelectHandler = opts.onSelect
        opts.onSelect = (value, picker)->
          updateModel(value)
          usersOnSelectHandler(value, picker)
      else
        ### No onSelect already specified so just update the model ###
        opts.onSelect = updateModel

      ### Update the date picker when the model changes ###
      controller.$render = ()->
        date = controller.$viewValue
        ### We don't need to convert to a Date here since setDate accepts a string
        element.datepicker("setDate", date)

    ### Create the datepicker widget ###
    element.datepicker(opts)

]
