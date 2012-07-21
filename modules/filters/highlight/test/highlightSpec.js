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
})