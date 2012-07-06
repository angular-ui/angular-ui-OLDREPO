
/**
 * Bind one or more handlers to particular keys or their combination
 * @param hash {string} keyBinding Keybinding expression of keys or keys combinations and AngularJS Exspressions. Syntax: "expression1 on keys1 [ and expression2 on keys2 [ ... ]]".  Expression is an AngularJS Expression, and key(s) are dash-separated combinations of keys and modifiers (one or many, if any. Order does not matter). Supported modifiers are 'ctrl', 'shift', 'alt' and key can be used either via its keyCode (13 for Return) or name. Named keys are 'backspace', 'tab', 'enter', 'esc', 'space', 'pageup', 'pagedown', 'end', 'home', 'left', 'up', 'right', 'down', 'insert', 'delete'.
 * @example <input ui-keypress="x = 1 on enter and foo() on ctrl-shift-space and bar() on shift-13" />
 **/
angular.module('ui.directives').directive('uiKeypress', [function(){
	return {
		link: function(scope, elm, attrs) {
		  var keysByCode = {
		     8: 'backspace',
		     9: 'tab',
		    13: 'enter',
		    27: 'esc',
		    32: 'space',
		    33: 'pageup',
		    34: 'pagedown',
		    35: 'end',
		    36: 'home',
		    37: 'left',
		    38: 'up',
		    39: 'right',
		    40: 'down',
		    45: 'insert',
		    46: 'delete'
		  };

      elm.bind('keydown', function(event) {
        // By default no code to execute
        var evalCode = '';
        // First of all we split binding of multiple keys
        angular.forEach(attrs.uiKeypress.split(/\s+and\s+/i), function(binding) {
          binding = binding.split(/\s+on\s+/i);
          var keys = binding[1].split('-');

          var mainKeyPressed = keys.indexOf( keysByCode[event.keyCode] ) > -1 || keys.indexOf( event.keyCode.toString() ) > -1

          var altPressed   = event.metaKey || event.altKey;
          var ctrlPressed  = event.ctrlKey;
          var shiftPressed = event.shiftKey;

          var altRequired   =  keys.indexOf('alt')   > -1;
          var ctrlRequired  =  keys.indexOf('ctrl')  > -1;
          var shiftRequired =  keys.indexOf('shift') > -1;

          if( mainKeyPressed &&
              ( altRequired   == altPressed   ) &&
              ( ctrlRequired  == ctrlPressed  ) &&
              ( shiftRequired == shiftPressed )
            ) {
            evalCode = binding[0];
          }
        });
        // Run the function
        scope.$eval(evalCode);
      });
		}
	};
}]);

