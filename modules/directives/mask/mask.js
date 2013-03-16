/*
 Attaches input mask onto input element
 */
angular.module('ui.directives').directive('uiMask', [
  function () {
    var maskDefinitions = {
      '9': /\d/,
      'A': /[a-zA-Z]/,
      '*': /[a-zA-Z0-9]/
    };
    return {
      priority: 100,
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, iElement, iAttrs, controller) {
        var maskProcessed = false, eventsBound = false,
            maskCaretMap, maskPatterns, maskPlaceholder,
            value, valueMasked, isValid,
            // Vars for initializing/uninitializing
            originalPlaceholder = iAttrs.placeholder,
            originalMaxlength   = iAttrs.maxlength,
            // Vars used exclusively in eventHandler()
            oldValue, oldValueUnmasked, oldCaretPosition, oldSelectionLength;

        iAttrs.$observe('uiMask', initialize);
        controller.$formatters.push(formatter);
        controller.$parsers.push(parser);

        function initialize(maskAttr) {
          if (!angular.isDefined(maskAttr))
            return uninitialize();
          processRawMask(maskAttr);
          if (!maskProcessed)
            return uninitialize();
          initializeElement();
          bindEventListeners();
        }

        function uninitialize() {
          maskProcessed = false;
          unbindEventListeners();

          if (angular.isDefined(originalPlaceholder))
            iElement.attr('placeholder', originalPlaceholder);
          else
            iElement.removeAttr('placeholder');

          if (angular.isDefined(originalMaxlength))
            iElement.attr('maxlength', originalMaxlength);
          else
            iElement.removeAttr('maxlength');

          iElement.val(controller.$modelValue);
          controller.$viewValue = controller.$modelValue;
          return false;
        }

        function initializeElement() {
          value       = oldValueUnmasked = unmaskValue(controller.$modelValue || '');
          valueMasked = oldValue         = maskValue(value);
          isValid     = validateValue(value);
          viewValue   = isValid && value.length ? valueMasked : '';
          if (iAttrs.maxlength) // Double maxlength to allow pasting new val at end of mask
            iElement.attr('maxlength', maskCaretMap[maskCaretMap.length-1]*2);
          iElement.attr('placeholder', maskPlaceholder);
          iElement.val(viewValue);
          controller.$viewValue = viewValue;
          // Not using $setViewValue so we don't clobber the model value and dirty the form
          // without any kind of user interaction.
        }

        function bindEventListeners() {
          if (eventsBound)
            return true;
          iElement.bind('blur',              blurHandler);
          iElement.bind('mousedown mouseup', mouseDownUpHandler);
          iElement.bind('input keyup click', eventHandler);
          eventsBound = true;
        }

        function unbindEventListeners() {
          if (!eventsBound)
            return true;
          iElement.unbind('blur',      blurHandler);
          iElement.unbind('mousedown', mouseDownUpHandler);
          iElement.unbind('mouseup',   mouseDownUpHandler);
          iElement.unbind('input',     eventHandler);
          iElement.unbind('keyup',     eventHandler);
          iElement.unbind('click',     eventHandler);
          eventsBound = false;
        }

        function formatter(fromModelValue) {
          if (!maskProcessed)
            return fromModelValue;
          value   = unmaskValue(fromModelValue || '');
          isValid = validateValue(value);
          controller.$setValidity('mask', isValid);
          return isValid ? maskValue(value) : undefined;
        }

        function parser(fromViewValue) {
          if (!maskProcessed)
            return fromViewValue;
          value     = unmaskValue(fromViewValue || '');
          isValid   = validateValue(value);
          viewValue = value.length ? maskValue(value) : '';
          // We have to set viewValue manually as the reformatting of the input
          // value performed by eventHandler() doesn't happen until after
          // this parser is called, which causes what the user sees in the input
          // to be out-of-sync with what the controller's $viewValue is set to.
          controller.$viewValue = viewValue;
          controller.$setValidity('mask', isValid);
          if (value === '' && controller.$error.required !== undefined)
            controller.$setValidity('required', false);
          return isValid ? value : undefined;
        }

        function validateValue(value) {
          // Zero-length value validity is ngRequired's determination
          return value.length ? value.length === maskCaretMap.length - 1 : true;
        }

        function unmaskValue(value) {
          var valueUnmasked    = '',
              maskPatternCopys = maskPatterns.slice();
          angular.forEach(value.toString().split(''), function(chr, i) {
            if (maskPatternCopys.length && maskPatternCopys[0].test(chr)) {
              valueUnmasked += chr;
              maskPatternCopys.shift();
            }
          });
          return valueUnmasked;
        }

        function maskValue(unmaskedValue) {
          var valueMasked      = '',
              maskCaretMapCopy = maskCaretMap.slice();
          angular.forEach(maskPlaceholder.split(''), function(chr, i) {
            if (unmaskedValue.length && i === maskCaretMapCopy[0]) {
              valueMasked  += unmaskedValue.charAt(0) || '_';
              unmaskedValue = unmaskedValue.substr(1);
              maskCaretMapCopy.shift(); }
            else
              valueMasked += chr;
          });
          return valueMasked;
        }

        function processRawMask(mask) {
          var characterCount = 0;
          maskCaretMap       = [];
          maskPatterns       = [];
          maskPlaceholder    = '';

          // If mask is an array, it's a complex mask!
          if (mask instanceof Array) {
            angular.forEach(mask, function(item, i) {
              if (item instanceof RegExp) {
                maskCaretMap.push(characterCount++);
                maskPlaceholder += '_';
                maskPatterns.push(item);
              }
              else if (typeof item == 'string') {
                angular.forEach(item.split(''), function(chr, i) {
                  maskPlaceholder += chr;
                  characterCount++;
                });
              }
            });
          }
          // Otherwise it's a simple mask
          else if (typeof mask === 'string') {
            angular.forEach(mask.split(''), function(chr, i) {
              if (maskDefinitions[chr]) {
                maskCaretMap.push(characterCount);
                maskPlaceholder += '_';
                maskPatterns.push(maskDefinitions[chr]);
              }
              else
                maskPlaceholder += chr;
              characterCount++;
            });
          }
          // Caret position immediately following last position is valid.
          maskCaretMap.push(maskCaretMap.slice().pop() + 1);
          maskProcessed = maskCaretMap.length > 1 ? true : false;
        }

        function blurHandler(e) {
          oldCaretPosition   = 0;
          oldSelectionLength = 0;
          if (!isValid || value.length === 0) {
            valueMasked = '';
            iElement.val('');
            scope.$apply(function() {
              controller.$setViewValue('');
            });
          }
        }

        iElement.bind('mousedown mouseup', mouseDownUpHandler);

        function mouseoutHandler(e) {
          oldSelectionLength = getSelectionLength(this);
          iElement.unbind('mouseout', mouseoutHandler);
        }

        function mouseDownUpHandler(e) {
          if (e.type === 'mousedown')
            iElement.bind('mouseout', mouseoutHandler);
          else
            iElement.unbind('mouseout', mouseoutHandler);
        }

        function eventHandler(e) {
          e = e || { which:0, type:'input' };
          // Allows more efficient minification
          var eventWhich = e.which,
              eventType  = e.type;

          // Prevent shift and ctrl from mucking with old values
          if (eventWhich == 16 || eventWhich == 91) return true;

          var elem            = iElement,
              val             = elem.val(),
              valOld          = oldValue,
              valMasked,
              valUnmasked     = unmaskValue(val),
              valUnmaskedOld  = oldValueUnmasked,
              valAltered      = false,

              caretPos        = getCaretPosition(this) || 0,
              caretPosOld     = oldCaretPosition || 0,
              caretPosDelta   = caretPos - caretPosOld,
              caretPosMin     = maskCaretMap[0],
              caretPosMax     = maskCaretMap[valUnmasked.length] || maskCaretMap.slice().shift(),

              selectionLen    = getSelectionLength(this),
              selectionLenOld = oldSelectionLength || 0,
              isSelected      = selectionLen > 0,
              wasSelected     = selectionLenOld > 0,

                                                                // Case: Typing a character to overwrite a selection
              isAddition      = (val.length > valOld.length) || (selectionLenOld && val.length >  valOld.length - selectionLenOld),
                                                                // Case: Delete and backspace behave identically on a selection
              isDeletion      = (val.length < valOld.length) || (selectionLenOld && val.length == valOld.length - selectionLenOld),
              isSelection     = (eventWhich >= 37 && eventWhich <= 40) && e.shiftKey, // Arrow key codes

              isKeyLeftArrow  = eventWhich == 37,
                                                    // Necessary due to "input" event not providing a key code
              isKeyBackspace  = eventWhich == 8  || (eventType != 'keyup' && isDeletion && (caretPosDelta === -1)),
              isKeyDelete     = eventWhich == 46 || (eventType != 'keyup' && isDeletion && (caretPosDelta === 0 ) && !wasSelected),

              // Handles cases where caret is moved and placed in front of invalid maskCaretMap position. Logic below
              // ensures that, on click or leftward caret placement, caret is moved leftward until directly right of
              // non-mask character. Also applied to click since users are (arguably) more likely to backspace
              // a character when clicking within a filled input.
              caretBumpBack   = (isKeyLeftArrow || isKeyBackspace || eventType == 'click') && caretPos > caretPosMin;

          oldSelectionLength  = selectionLen;

          // These events don't require any action
          if (isSelection || (isSelected && (eventType == 'click' || eventType == 'keyup')))
            return true;

          // Value Handling
          // ==============

          // User attempted to delete but raw value was unaffected--correct this grievous offense
          if ((eventType == 'input' || eventType == 'propertychange') && isDeletion && !wasSelected && valUnmasked === valUnmaskedOld) {
            while (isKeyBackspace && caretPos > 0 && !isValidCaretPosition(caretPos))
              caretPos--;
            while (isKeyDelete && caretPos < maskPlaceholder.length && maskCaretMap.indexOf(caretPos) == -1)
              caretPos++;
            var charIndex = maskCaretMap.indexOf(caretPos);
            // Strip out non-mask character that user would have deleted if mask hadn't been in the way.
            valUnmasked = valUnmasked.substring(0, charIndex) + valUnmasked.substring(charIndex + 1);
            valAltered  = true;
          }

          // Update values
          valMasked        = maskValue(valUnmasked);
          oldValue         = valMasked;
          oldValueUnmasked = valUnmasked;
          elem.val(valMasked);
          if (valAltered) {
            // We've altered the raw value after it's been $digest'ed, we need to $apply the new value.
            scope.$apply(function() {
              controller.$setViewValue(valUnmasked);
            });
          }

          // Caret Repositioning
          // ===================

          // Ensure that typing always places caret ahead of typed character in cases where the first char of
          // the input is a mask char and the caret is placed at the 0 position.
          if (isAddition && (caretPos <= caretPosMin))
            caretPos = caretPosMin + 1;

          if (caretBumpBack)
            caretPos--;

          // Make sure caret is within min and max position limits
          caretPos = caretPos > caretPosMax ? caretPosMax : caretPos < caretPosMin ? caretPosMin : caretPos;

          // Scoot the caret back or forth until it's in a non-mask position and within min/max position limits
          while (!isValidCaretPosition(caretPos) && caretPos > caretPosMin && caretPos < caretPosMax)
            caretPos += caretBumpBack ? -1 : 1;

          if ((caretBumpBack && caretPos < caretPosMax) || (isAddition && !isValidCaretPosition(caretPosOld)))
            caretPos++;
          oldCaretPosition = caretPos;
          setCaretPosition(this, caretPos);
        }

        function isValidCaretPosition(pos) { return maskCaretMap.indexOf(pos) > -1; }

        function getCaretPosition(input) {
          if (input.selectionStart !== undefined)
            return input.selectionStart;
          else if (document.selection) {
            // Curse you IE
            input.focus();
            var selection = document.selection.createRange();
            selection.moveStart('character', -input.value.length);
            return selection.text.length;
          }
        }

        function setCaretPosition(input, pos) {
          if (input.offsetWidth === 0 || input.offsetHeight === 0)
            return true; // Input's hidden
          if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(pos,pos); }
          else if (input.createTextRange) {
            // Curse you IE
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
          }
        }

        function getSelectionLength(input) {
          if (input.selectionStart !== undefined)
            return (input.selectionEnd - input.selectionStart);
          if (document.selection)
            return (document.selection.createRange().text.length);
        }

        // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
        if (!Array.prototype.indexOf) {
          Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
            "use strict";
            if (this === null) {
              throw new TypeError();
            }
            var t = Object(this);
            var len = t.length >>> 0;
            if (len === 0) {
              return -1;
            }
            var n = 0;
            if (arguments.length > 1) {
              n = Number(arguments[1]);
              if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
              } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
              }
            }
            if (n >= len) {
              return -1;
            }
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (; k < len; k++) {
              if (k in t && t[k] === searchElement) {
                return k;
              }
            }
            return -1;
          };
        }

      }
    };
  }
]);