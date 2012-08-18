describe('uiValidate', function ($compile) {
  var scope, compileAndDigest;

  var trueValidator = function () {
    return true;
  };

  var falseValidator = function () {
    return false;
  };

  var passedValueValidator = function (valueToValidate) {
    return valueToValidate;
  };

  beforeEach(module('ui'));
  beforeEach(inject(function ($rootScope, $compile) {

    scope = $rootScope.$new();
    compileAndDigest = function (inputHtml, scope) {
      var inputElm = angular.element(inputHtml);
      var formElm = angular.element('<form name="form"></form>');
      formElm.append(inputElm);
      $compile(formElm)(scope);
      scope.$digest();

      return inputElm;
    };
  }));

  describe('initial validation', function () {

    it('should mark input as valid if initial model is valid', inject(function () {

      scope.validate = trueValidator;
      compileAndDigest('<input name="input" ng-model="value" ui-validate="validate">', scope);
      expect(scope.form.input.$valid).toBeTruthy();
      expect(scope.form.input.$error).toEqual({validator: false});
    }));

    it('should mark input as invalid if initial model is invalid', inject(function () {

      scope.validate = falseValidator;
      compileAndDigest('<input name="input" ng-model="value" ui-validate="validate">', scope);
      expect(scope.form.input.$valid).toBeFalsy();
      expect(scope.form.input.$error).toEqual({ validator: true });
    }));
  });

  describe('validation on model change', function () {

    it('should change valid state in response to model changes', inject(function () {

      scope.value = false;
      scope.validate = passedValueValidator;
      compileAndDigest('<input name="input" ng-model="value" ui-validate="validate">', scope);
      expect(scope.form.input.$valid).toBeFalsy();

      scope.$apply('value = true');
      expect(scope.form.input.$valid).toBeTruthy();
    }));
  });

  describe('validation on element change', function () {

    var sniffer;
    beforeEach(inject(function ($sniffer) {
      sniffer = $sniffer;
    }));

    it('should change valid state in response to element events', function () {

      scope.value = false;
      scope.validate = passedValueValidator;
      var inputElm = compileAndDigest('<input name="input" ng-model="value" ui-validate="validate">', scope);
      expect(scope.form.input.$valid).toBeFalsy();

      inputElm.val('true');
      inputElm.trigger((sniffer.hasEvent('input') ? 'input' : 'change'));

      expect(scope.form.input.$valid).toBeTruthy();
    });
  });

  describe('multiple validators with custom keys', function () {

    it('should support multiple validators with custom keys', function () {

      scope.validate1 = trueValidator;
      scope.validate2 = falseValidator;

      compileAndDigest('<input name="input" ng-model="value" ui-validate="{key1 : validate1, key2 : validate2}">', scope);
      expect(scope.form.input.$valid).toBeFalsy();
      expect(scope.form.input.$error.key1).toBeFalsy();
      expect(scope.form.input.$error.key2).toBeTruthy();
    });
  });

  describe('error cases', function () {
    it('should fail if ngModel not present', inject(function () {
      expect(function () {
        compileAndDigest('<input name="input" ui-validate="validate">', scope);
      }).toThrow(new Error('No controller: ngModel'));
    }));
    it('should have no effect if validate expression is empty', inject(function () {
      compileAndDigest('<input ng-model="value" ui-validate="">', scope);
    }));
  });
});
