
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
    initDateWidget = ()->
      opts = angular.extend({}, options, scope.$eval(attrs.uiDate))
      console.log 'value:', scope.$eval(attrs.uiDate)
      console.log 'opts:', opts
    
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
          date = new Date(date) unless date instanceof Date
          element.datepicker("setDate", date)

      ### Create the datepicker widget ###
      element.datepicker(opts)
      console.log 'minDate', element.datepicker( "option", "minDate" )
    
    updateDateOptions = (options)->
      for own name, value of options
        element.datepicker('option', name, value)
      
    scope.$watch(attrs.uiDate, updateDateOptions, true)
    initDateWidget()
]