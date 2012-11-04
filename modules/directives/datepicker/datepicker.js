'use strict';

angular.module( 'ui.directives', [] )
.directive( 'uiDatepicker', ['ui.config', function( uiConfig ) {
 	var options;
 	options = {};
 	if( angular.isObject( uiConfig.datepicker ) ) {
 		angular.extend( options, uiConfig.datepicker );
 	}
 	return {
 		require: '?ngModel',
 		link: function( $scope, element, attrs, controller ) {
 			var getOptions = function() {
 				var options = {};

 				if( attrs.uiFormat ) options.format = $scope.$eval( attrs.uiFormat );
 				if( attrs.uiWeekStart ) options.weekStart = $scope.$eval( attrs.uiWeekStart );
 				if( attrs.uiStartDate ) options.startDate = $scope.$eval( attrs.uiStartDate );
 				if( attrs.uiEndDate ) options.endDate = $scope.$eval( attrs.uiEndDate );
 				if( attrs.uiAutoclose ) options.autoclose = $scope.$eval( attrs.uiAutoclose );
 				if( attrs.uiStartView ) options.startView = $scope.$eval( attrs.uiStartView );
 				if( attrs.uiTodayBtn ) options.todayBtn = $scope.$eval( attrs.uiTodayBtn );
 				if( attrs.uiTodayHighlight ) options.todayHighlight = $scope.$eval( attrs.uiTodayHighlight );
 				if( attrs.uiKeyboardNavigation ) options.keyboardNavigation = $scope.$eval( attrs.uiKeyboardNavigation );
 				if( attrs.uiLanguage ) options.format = $scope.$eval( attrs.uiLanguage );

 				options = angular.extend( options, uiConfig.datepicker, $scope.$eval( attrs.datepicker ) );

 				return options;
 			};

 			var opts = getOptions();
 			if( controller ) {
 				var updateModel = function( ev ) {
 					return $scope.$apply( function() {
 						var date = ev.date;
 						controller.$setViewValue( date );
 					} );
 				};

 				controller.$render = function() {
 					var date = controller.$viewValue;
 					if( date )
 						element.datepicker( 'setDate', date );
 				};
 				if( attrs.uiStartDate ) {
 					$scope.$watch( attrs.uiStartDate, function( newValue, oldValue ) {
 						element.datepicker( 'setStartDate', newValue );
 					}, true );
 				}

 				if( attrs.uiEndDate ) {
 					$scope.$watch( attrs.uiEndDate, function( newValue, oldValue ) {
 						element.datepicker( 'setEndDate', newValue );
 					}, true );
 				}
 				element.datepicker( opts ).on( 'changeDate', updateModel );

 				controller.$render();
 			};
 		}
 	};
 }] );