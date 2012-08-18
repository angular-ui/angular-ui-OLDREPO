describe 'uiMask', ()->

  # Ensure the mask angular module is loaded
  beforeEach module 'ui.directives'

  describe 'simple use on input element', ()->

    # this test could prove nothing but will be expanded
    it 'should have a mask attached', ()->
      inject ($compile, $rootScope)->
        $rootScope.$apply ()->
          $rootScope.x = 1234567890
        element = $compile("<input ui-mask=\"'(999).999-9999'\" placeholder=\"(___).___-____\" ng-model='x'></input>")($rootScope)
        expect(element).toBeDefined()