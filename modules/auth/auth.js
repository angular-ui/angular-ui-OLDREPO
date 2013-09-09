/**
 * @license HTTP Auth Interceptor Module for AngularJS
 * (c) 2012 Witold Szczerba
 * License: MIT
 */
angular.module('ui.auth', ['ui.config'])

  .provider('uiAuth', ['ui.config', function(uiConfig) {
    uiConfig.auth = uiConfig.auth || {};
    /**
     * Holds all the requests which failed due to 401 response,
     * so they can be re-requested in future, once login is completed.
     */
    var buffer = [];

    /**
     * Required by HTTP interceptor.
     * Function is attached to provider to be invisible for regular users of this service.
     */
    this.pushToBuffer = function(config, deferred) {
      buffer.push({
        config: config,
        deferred: deferred
      });
    }

    this.$get = ['$rootScope','$injector', function($rootScope, $injector) {
      var $http; //initialized later because of circular dependency problem
      function retry(config, deferred) {
        $http = $http || $injector.get('$http');
        $http(config).then(function(response) {
          deferred.resolve(response);
        });
      }
      function retryAll() {
        angular.forEach(buffer, function(item){
          retry(item.config, item.deferred);
        });
        buffer = [];
      }

      return {
        authenticated: function(resetBuffer) {
          $rootScope.$broadcast('ui:authenticated');
          if (resetBuffer === undefined && uiConfig.auth.resetBuffer)
            buffer = [];
          else
            retryAll();
        }
      }
    }]
  })

  /**
   * $http interceptor.
   * On 401 response - it stores the request and broadcasts 'ui:unauthenticated'.
   */
  .config(['$httpProvider', 'uiAuthProvider', function($httpProvider, uiAuthProvider) {

    var interceptor = ['$rootScope', '$q', function($rootScope, $q) {
      function success(response) {
        return response;
      }

      function error(response) {
        if (response.status === 401) {
          var deferred = $q.defer();
          authProvider.pushToBuffer(response.config, deferred);
          $rootScope.$broadcast('ui:unauthenticated');
          return deferred.promise;
        }
        // otherwise
        return $q.reject(response);
      }

      return function(promise) {
        return promise.then(success, error);
      }

    }];
    $httpProvider.responseInterceptors.push(interceptor);
  }]);