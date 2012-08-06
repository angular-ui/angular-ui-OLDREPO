describe('inflector', function() {
	var inflectorFilter, testPhrase = 'here isMy_phone_number';

	beforeEach(module('ui.filters'));
	beforeEach(inject(function($filter) {
		inflectorFilter = $filter('inflector');
	}));

	describe('default', function() {
		it('should default to humanize', function() {
			expect(inflectorFilter(testPhrase)).toEqual('Here Is My Phone Number');
		});
		it('should remove extra separator characters', function() {
			expect(inflectorFilter(' Here  Is my__phoneNumber_')).toEqual('Here Is My Phone Number');
		});
	});

	describe('humanize', function() {
		it('should uppercase first letter and separate words with a space', function() {
			expect(inflectorFilter(testPhrase, 'humanize')).toEqual('Here Is My Phone Number');
		});
	});
	describe('underscore', function() {
		it('should lowercase everything and separate words with an underscore', function() {
			expect(inflectorFilter(testPhrase, 'underscore')).toEqual('here_is_my_phone_number');
		});
	});
	describe('variable', function() {
		it('should remove all separators and camelHump the phrase', function() {
			expect(inflectorFilter(testPhrase, 'variable')).toEqual('hereIsMyPhoneNumber');
		});
	});
});