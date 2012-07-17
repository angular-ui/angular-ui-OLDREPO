describe('wordwrap', function() {
  var wordwrap;

  beforeEach(module('ui.filters'));
  beforeEach(inject(function($filter) {
    wordwrap = $filter('wordwrap');
  }));

  describe('test', function() {
    it('should wrap chars into an array or join them', function() {
      expect(wordwrap('abc',1)).toEqual(['a','b','c']);
      expect(wordwrap('abc',1,'\n')).toEqual('a\nb\nc');
    });

    it('should wrap chars and join', function() {
      expect(wordwrap('Hello World!', 3, '!!')).toEqual('Hel!!lo !!Wor!!ld!');
      expect(wordwrap('Long Phrase', 2, '\n')).toEqual('Lo\nng\n P\nhr\nas\ne');
    });

    it('should work with less chars than wrapping', function() {
      expect(wordwrap('123', 5)).toEqual(['123']);
      expect(wordwrap('123', 5, 'join')).toEqual('123');
    });

  });

});