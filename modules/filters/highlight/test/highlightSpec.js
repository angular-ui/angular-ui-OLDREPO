describe('highlight', function() {
  var highlightFilter, testPhrase = 'prefix highlight suffix';

  beforeEach(module('ui.filters'));
  beforeEach(inject(function($filter) {
    highlightFilter = $filter('highlight');
  }));

  it('should highlight a matching phrase', function() {
    expect(highlightFilter(testPhrase, 'highlight')).toEqual('prefix <span class="ui-match">highlight</span> suffix');
  });
  it('should highlight nothing if no match found', function() {
    expect(highlightFilter(testPhrase, 'no match')).toEqual(testPhrase);
  });
  it('should highlight nothing for the undefined filter', function() {
    expect(highlightFilter(testPhrase, undefined)).toEqual(testPhrase);
  });
  it('should work correctly for number filters', function() {
    expect(highlightFilter('3210123', 0)).toEqual('321<span class="ui-match">0</span>123');
  });
  it('should highlight nothing if empty filter string passed - issue #114', function() {
    expect(highlightFilter(testPhrase, '')).toEqual(testPhrase);
  });
})