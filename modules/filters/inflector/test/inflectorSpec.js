describe('inflector', function() {
  var inflectorFilter, testPhrase = 'Here Is my_phoneNumber', testPhraseComplex = '___ _ Here     _Is_   my_____phoneNumber____';

  beforeEach(module('ui.filters'));
  beforeEach(inject(function($filter) {
    inflectorFilter = $filter('inflector');
  }));
  
  describe('default', function() {
    it('should default to humanize', function() {
      expect(inflectorFilter(testPhrase)).toEqual('Here Is My Phone Number');
    });
  });

  describe('humanize', function() {
    it('should uppercase first letter and separate words with a space', function() {
      expect(inflectorFilter(testPhrase, 'humanize')).toEqual('Here Is My Phone Number');
    });
    it('should remove extra separator characters and trailing underscore', function() {
      expect(inflectorFilter(testPhraseComplex)).toEqual('Here Is My Phone Number');
    });
  });

  describe('underscore', function() {
    it('should lowercase everything and separate words with an underscore', function() {
      expect(inflectorFilter(testPhrase, 'underscore')).toEqual('here_is_my_phone_number');
    });
    it('should remove extra separator characters and trailing underscore', function() {
      expect(inflectorFilter(testPhraseComplex, 'underscore')).toEqual('here_is_my_phone_number');
    });
  });

  describe('variable', function() {
    it('should remove all separators and camelHump the phrase', function() {
      expect(inflectorFilter(testPhrase, 'variable')).toEqual('hereIsMyPhoneNumber');
    });
    it('should remove extra separator characters and trailing underscore', function() {
      expect(inflectorFilter(testPhraseComplex, 'variable')).toEqual('hereIsMyPhoneNumber');
    });
  });

});