// READ: http://docs-next.angularjs.org/guide/ie
(function(){
  
  var getIE = function() {
      // Returns the version of Internet Explorer or a -1
      // (indicating the use of another browser).
     var rv = -1; // Return value assumes failure.
     if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) {
        	rv = parseFloat( RegExp.$1 );
        }
     }
     return rv;
  };

  var tags = [ 'ng-include', 'ng-pluralize', 'ng-view', 'ng:include', 'ng:pluralize', 'ng:view' ];
  var shiv = function() {
    for(var i = 0, len = tags.length; i < len; i++) {
      document.createElement(tags[i]);
    }
  };
	
  var ieVersion = getIE();
  if (ieVersion > -1 && ieVersion < 9) {
    shiv();
  }
  
})();

/**
 * @module ui
 * Bind Angular.js modules
 */
angular.module('ui.filters', []);
angular.module('ui.directives', []);
angular.module('ui', [
  'ui.filters', 
  'ui.directives'
]).value('ui.config', {});
/*
 General-purpose jQuery wrapper. Simply pass the plugin name as the expression.
 
 @TODO Devise a way to pass app-wide defined configuration options. Consider global var. 
 @param [ui-jq] {string} The $elm.[pluginName]() to call.
 @param [ui-options] {mixed} Expression to be evaluated and passed as options to the function
*/

(function() {

  angular.module('ui.directives').directive('uiDate', function() {
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

/**
 * General-purpose Event binding. Bind any event not natively supported by Angular
 * Both ui-event-call is used when a string is passed to ui-event
 * Alternatively you can pass an object with keynames for events to ui-event
 * 
 * @example <input ui-event="blur" ui-event-call="myCallbackFunction">
 * @example <input ui-event="{ focus : function(){alert('hi')}, blur : function(){alert('bye')} }">
 * 
 * @param ui-event {string|object literal} The event to bind to as a string or a hash of events with their callbacks
 * @param [ui-event-call] {function(event)} Callback function to execute upon event firing
 * @param [ui-event-data] {object} Optional data to pass to the event callbacks
 */
angular.module('ui.directives').directive('uiEvent', [function() {
	return function(scope, elm, attrs) {
		var events = scope.$eval(attrs.uiEvent),
			data = {};
		if (attrs.uiEventData) {
			data = scope.$eval(attrs.uiEventData);
		}
		if (angular.isString(event)) {
			elm.bind(events, data, scope.$eval(attrs.uiEventCall));
		} else {
			elm.bind(events, data);
		}
	};
}]);

/**
 * General-purpose jQuery wrapper. Simply pass the plugin name as the expression.
 * 
 * @TODO Devise a way to pass app-wide defined configuration options. Consider global var. 
 * @param [ui-jq] {string} The $elm.[pluginName]() to call.
 * @param [ui-options] {mixed} Expression to be evaluated and passed as options to the function
 */
angular.module('ui.directives').directive('uiJq', [function() {
	return function(scope, elm, attrs) {
		if (attrs.uiOptions) {
			elm[attrs.uiJq](scope.$eval(attrs.uiOptions));
		} else {
			elm[attrs.uiJq]();
		}
	};
}]);

/**
 * Bind an event to the 'return' keypress
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/
angular.module('ui.directives').directive('uiKeypress', [function(){
	return function(scope, elm, attrs) {
		var params = scope.$eval( '[' + attrs.uiKeypress + ']' );
		params[1] = params[1] || angular.noop();
		elm.bind('keypress', function(event){
			if (event.keyCode == params[0]){
				params[1](event);
				scope.$apply();
			}
		});
	};
}]);
/**
 * Changes the current element from a link to a span tag based on a condition
 * @param expression {boolean} condition to check if it should be a link or not
 */
angular.module('ui.directives').directive('uiLinky', [function() {
	return function(scope, elm, attrs) {	
		var newElm;
		scope.$watch(attrs.uiLinky, function(newVal, oldVal){
			if (newVal) {
				newElm = angular.element('<a>');
				if (attr['ng-click']) {
					newElm.click(function(e){
						if (attr.href === undefined) {
							e.preventDefault();
						}
						scope.$eval(attr['ng-click']);
					});
				}
			} else {
				newElm = angular.element('<span>');
			}     
			delete attrs.href;
			delete attrs['ng-click'];
			delete attrs.uiLinky;
			newElm.attr(attrs);
			elm.replaceWith(newElm);
		});
	};
}]);

/*
 Changes the current element from a link to a span tag based on a condition
 @param expression {boolean} condition to check if it should be a link or not
*/

(function() {

  angular.module('ui.directives').directive('uiMask', function() {
    return {
      require: 'ngModel',
      scope: {
        uiMask: 'evaluate'
      },
      link: function($scope, element, attrs, controller) {
        controller.$render = function() {
          var _ref;
          element.val((_ref = controller.$viewValue) != null ? _ref : '');
          return element.mask($scope.uiMask);
        };
        controller.$parsers.push(function(value) {
          var isValid;
          isValid = element.data('mask-isvalid');
          controller.$setValidity('mask', isValid);
          if (isValid) {
            return element.mask();
          } else {
            return null;
          }
        });
        return element.bind('blur', function() {
          return $scope.$apply(function() {
            return controller.$setViewValue(element.mask());
          });
        });
      }
    };
  });

}).call(this);

/**
 * Actually removes html from the DOM instead of hiding it for assistance with 
 * CSS3 selectors such as :first-child, :last-child, etc
 * 
 * NOTE: This solution may not behave perfectly when used with or around other directives that also
 *   manipulate the dom.
 * 
 * @todo Add a more resilient solution to injecting removed elements back into the DOM (instead of relying on nextElm)
 * @param remove {boolean} condition to check if the element should be removed form the DOM
 */
angular.module('ui.directives').directive('uiRemove', [function() {
	return function(scope, elm, attrs) {
		var parent = elm.parent();
		var expression = attrs.uiRemove;
		elm.data('ui-remove-index', elm.index());
		scope.$watch(expression, function(newValue, oldvalue) {
			var index, children, child;
			if (newValue) {
				elm.detach(); 
			} else if (!$.contains(parent, elm)) {
				index = elm.data('ui-remove-index');
				children = elm.parent().children();
				if (children.length > 0) {
					for (var i = 0; i < children.length; i++) {
						child = children[i];
						if (index > child.index() && i === children.length-1) {
							child.after(elm);
						} else {
							child.before(elm);
						}
					}
				} else {
					parent.append(elm);
				}
			}
		});
	};
}]);
/**
 * Add a clear button to form inputs to reset their value
 */
angular.module('ui.directives').directive('uiReset', [function() {
	return function(scope, elm, attrs) {
		elm.wrap('<span class="ui-resetwrap" />').after('<a class="ui-reset" />').next().click(function(e){
			e.preventDefault();
			elm.val(null).trigger('change');
			// scope[attrs.ngModel] = null;
			// scope[attrs.ngModelInstant] = null;
			// scope.$apply();
		});
	};
}]);
/**
 * Adds a 'fixed' class to the element when the page scrolls past it's position.
 * @param [offset] {int} optional Y-offset to override the detected offset
 */
angular.module('ui.directives').directive('uiScrollfix', [function() {
  return function(scope, elm, attrs) {
    var top = elm.offset().top,
    original = '';
    if (!attrs.uiScrollfix) {
      attrs.uiScrollfix = top;
    } else {
      original = attrs.uiScrollfix;
      if (attrs.uiScrollfix.indexOf('-') === 0) {
        attrs.uiScrollfix = top - attrs.uiScrollfix.substr(1);
      } else if (attrs.uiScrollfix.indexOf('+') === 0) {
        attrs.uiScrollfix = top + parseInt(attrs.uiScrollfix.substr(1));
      }
    }
    $(window).unbind('scroll.ui-scrollfix'+original).bind('scroll.ui-scrollfix'+original, function(){
      if (!elm.hasClass('fixed') && window.pageYOffset > attrs.uiScrollfix) {
        elm.addClass('fixed');
      } else if (elm.hasClass('fixed') && window.pageYOffset < attrs.uiScrollfix) {
        elm.removeClass('fixed');
      }
    });
  };
}]);

/**
 * An awesome alternative enhancement to the original jQuery Chosen (HarvestHQ)
 * 
 * @link http://ivaynberg.github.com/select2/
 * @param [uiSelect2] {object} containing configuration options. Merged onto your uiConfig.select2 definition
 */
angular.module('ui.directives').directive('uiSelect2', ['ui.config', function(uiConfig){
	uiConfig.select2 = uiConfig.select2 || {};
	return function(scope, elm, attrs) {
		var options = angular.extend({}, uiConfig.select2, scope.$eval(attrs.uiSelect2));
		setTimeout(function(){
			elm.select2(options);
			scope.$watch(attrs.ngModel, function(newVal, oldVal){
				elm.select2('val', newVal);
			});             
		},0);
	};
}]);


/**
*  --- NEW VERSION : Needs to be updated to v1.0 ---
* 
 * My god, the most convoluted pile of shlock ever
 *
 * @concerns When the plugin loads, it injects an extra DIV into the DOM below itself. This disrupts the 
 *   compiler, breaking everything below. Because of this, it must be initialized asynchronously (late).
 *   Since the ng:model and ng:options/ng:repeat can be populated by AJAX, they must be monitored in order
 *   to refresh the plugin so that it reflects the selected value
 * @AJAX Multiselect - For these, you must use an <input>. The values will NOT be in the form of an Array,
 *   but a comma-separated list. You must adjust the value as needed before using accordingly
 * @params [options] {object} The configuration options passed to $().select2(). Refer to the documentation
 *   - [watch] {string} an expression to monitor for changes. For use with ng:repeat populated via ajax
angular.directive('jv:select2', function(expression, compiledElement) {
	var options = { allowClear: true };
	if (angularui['select2']) {
		angular.extend(options, angularui['select2']);
	}
	return function(elm) {
		var scope = this,
			init = true, // Only query the selected value's data when the plugin loads
			opts,
			prevVal = '',
			loaded = false,
			model = elm.attr('ng:model');
		
		function initialize(newVal) {	
			if (newVal !== undefined) {
				if (opts.ajax) {
					if (newVal && !$.isEmptyObject(newVal)) {
						if (init) {
						    if (opts.multiple) {
								if (angular.isArray(newVal)) {
									ids = newVal.join('&ids=');
								} else {
									ids = newVal.split(',').join('&ids=');
								}
							} else {
								ids = newVal;
							}
						    $.ajax(opts.ajax.url + '&ids=' + ids, {success: function(data){
								data = opts.ajax.results(data);
								if (data.results[0]) {
						    		elm.select2('val', data.results[0]);
								} else {
									elm.select2('val', '');
								}
						    }});
							init = false
						}
					} else {
					    elm.select2('val', '');
					}
				} else {
					elm.select2('val', newVal);
				}
			}
			
		}
		
		opts = angular.extend({}, options, scope.$eval(expression));
		if (elm.attr('multiple') !== undefined) {
			opts.multiple = true;
		}
		
		// Initialize the plugin late so that the injected DOM does not disrupt the template compiler
		setTimeout(function(){
			elm.select2(opts);
			loaded = true;
			// If a watch was fired before initialized, set the init value
			initialize(prevVal);
		},0);
		
		// Watch the model for programmatic changes
		scope.$watch(model, function(scope, newVal, oldVal) {
			if (newVal === prevVal) {
				return;
			}
			if (loaded) {
				initialize(newVal);
			}
			prevVal = newVal;
		});
		// If you want you can watch the set of options for changes
		if (angular.isString(opts.watch)) {
			scope.$watch(opts.watch, function(scope, newVal, oldVal){
				if (loaded && prevVal) {
					setTimeout(function(){
						elm.select2('val', prevVal);
					},0);
				}
			});
		}
	};
});
*/
/**
 * NOTE: Only adds classes, you must add the class definition yourself
 */

/**
 * uiShow Directive
 *
 * Adds a 'ui-show' class to the element instead of display:block
 * Created to allow tighter control  of CSS without bulkier directives
 *
 * @param expression {boolean} evaluated expression to determine if the class should be added
 */
angular.module('ui.directives').directive('uiShow', [function() {
	return function(scope, elm, attrs) {
		scope.$watch(attrs.uiShow, function(newVal, oldVal){
			if (newVal) {
				elm.addClass('ui-show');
			} else {
				elm.removeClass('ui-show');
			}	
		});
	};
}])

/**
 * uiHide Directive
 *
 * Adds a 'ui-hide' class to the element instead of display:block
 * Created to allow tighter control  of CSS without bulkier directives
 *
 * @param expression {boolean} evaluated expression to determine if the class should be added
 */
.directive('uiHide', [function() {
	return function(scope, elm, attrs) {
		scope.$watch(attrs.uiHide, function(newVal, oldVal){
			if (newVal) {
				elm.addClass('ui-hide');
			} else {
				elm.removeClass('ui-hide');
			}
		});
	};
}])

/**
 * uiToggle Directive
 *
 * Adds a class 'ui-show' if true, and a 'ui-hide' if false to the element instead of display:block/display:none
 * Created to allow tighter control  of CSS without bulkier directives. This also allows you to override the
 * default visibility of the element using either class.
 *
 * @param expression {boolean} evaluated expression to determine if the class should be added
 */
.directive('uiToggle', [function() {
	return function(scope, elm, attrs) {
		scope.$watch(attrs.uiToggle, function(newVal, oldVal){
			if (newVal) {
				elm.removeClass('ui-hide').addClass('ui-show');
			} else {
				elm.removeClass('ui-show').addClass('ui-hide');
			}
		});
	};
}]);/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
angular.module('ui.directives').directive('uiTinymce', ['ui.config', function(uiConfig){
	uiConfig.tinymce = uiConfig.tinymce || {};
	return function(scope, elm, attrs) {
		var expression,
		  options = {
			// Update model on button click
			onchange_callback: function(inst) {
				if (inst.isDirty()) {
					inst.save();
					elm.trigger('change');
				}
			},
			// Update model on keypress
			handle_event_callback: function(e) {
				if (this.isDirty()) {
					this.save();
					elm.trigger('change');
				}
				return true; // Continue handling
			},
			// Update model when calling setContent (such as from the source editor popup)
			setup : function(ed) {
				ed.onSetContent.add(function(ed, o) {
					if (ed.isDirty()) {
						elm.trigger('change');
					}
				});
			}
		};
		if (attrs.uiTinymce) {
			expression = scope.$eval(attrs.uiTinymce);
		} else {
			expression = {};
		}
		angular.extend(options, uiConfig.tinymce, expression);
		setTimeout(function(){
			elm.tinymce(options);
		}, 0);
	};
}]);
/**
 * Adds a 'fixed' class to the element when the page scrolls past it's position.
 * @param expression {boolean} condition to check if it should be a link or not
 */
angular.module('ui.filters').filter('highlight', function() {
  return function(text, filter) {
    if (filter === undefined) {
      return text;
    } else {
      return text.replace(new RegExp(filter, 'gi'), '<span class="match">$&</span>');
    };
  };
});
/**
 * Returns the length property of the filtered object
 */
angular.module('ui.filters').filter('length', function() {
	return function(value) {
		return value.length;
	};
});
/**
 * Filters out all duplicate items from an array by checking the specified key
 * @param key {string} the name of the attribute of each object to compare for uniqueness
 * @return {array}
 */
angular.module('ui.filters').filter('unique', function() {
	return function(items, key) {
		if (key) {
			var hashCheck = {};
			for (i in items) {
				var value = items[i][key];
				if (typeof(hashCheck[value]) !== 'undefined') {
					delete items[i];
				} else {
					hashCheck[value] = true;
				}
			}
		} else {
			var o = {},
				i, 
				l = items.length, 
				r = [];
			for (i=0; i<l;i+=1) {
				o[items[i]] = items[i];
			}
			for (i in o) {
				r.push(o[i]);
			}
			items = r;
		}
		return items;
	};

});