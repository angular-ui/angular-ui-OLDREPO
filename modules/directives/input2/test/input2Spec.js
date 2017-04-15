describe('ui-input2', function () {
  var scope, $compile, elm,
      inputTypes = ['text', 'number', 'checkbox', 'radio'];

  beforeEach(module('ui.directives'));
  beforeEach(inject(function ($rootScope, _$compile_) {
    function makeInput (type) {
      return $('<input type="' + type + '" class="' + type + '" ng-model="data" />');
    }

    scope = $rootScope.$new();
    $compile = _$compile_;
    elm = $('<div>');

    angular.forEach(inputTypes, function(type) {
      elm.append(makeInput(type));
    });


    var dynamic = makeInput('{{type}}');
    dynamic.attr('ui-input2','');
    dynamic.attr('name','dynamic');
    dynamic.attr('class','dynamic');
    elm.append(dynamic);

    $compile(elm)(scope);
  }));

  function getDynamicInput() {
    return $('.dynamic',elm).last();
  }
  function getInput(type) {
    return $('.'+type);
  }

  it('should change a type property of input tag witout errors', function () {
    // Default is text
    expect(getDynamicInput().attr('type')).toBe('text');

    angular.forEach(inputTypes, function(type) {
      scope.$apply(function() {
        scope.type = type;
      });
      expect(getDynamicInput().attr('type')).toBe(type);
    });
  });
});
