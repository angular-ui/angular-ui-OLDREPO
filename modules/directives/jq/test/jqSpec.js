describe('uiJq', function() {
  var scope;
  scope = null;
  beforeEach(module('ui.directives'));
  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));
  describe('function or plugin isn\'t found', function() {
    it('should throw an error', function() {
      inject(function($compile) {
        expect(function(){
          $compile("<div ui-jq='failure'></div>")(scope);
        }).toThrow('ui-jq: The "failure" function does not exist');
      });
    });
  });
});
