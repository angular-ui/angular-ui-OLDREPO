angular.module('ui.services')

.factory('promiseTracker', ['$q', function($q) {
  var self = this;
  var trackers = {};

  function Tracker(name) {
    var self = this;
    var numPending = 0;
    var callbacks = {
      start: [], //called when a new promise is added
      done: [], //called when a promise is resolved (error or success)
      error: [], //called on error
      success: [] //called on success
    };
    self.active = function() {
      return numPending > 0;
    };
    /*
     * on: add a callback for an event
     * @param event: 'start', 'done', 'error', or 'success'
     * @param callback: function() {} to call when event happens
     * @return function removeCallback: removes listener
     */
    self.on = self.bind = function(event, cb) {
      if (!callbacks[event]) {
        throw "Cannot create callback for event '" + event + 
        "'. Allowed types: 'start', 'done', 'error', 'success'";
      }
      callbacks[event].push(cb);
      return self; //self for chaining
    };
    self.off = self.unbind = function(event, cb) {
      if (!callbacks[event]) {
        throw "Cannot create callback for event '" + event + 
        "'. Allowed types: 'start', 'done', 'error', 'success'";
      }
      //If a callback is given, remove just that callback
      if (cb) {
        var idx = callbacks[event].indexOf(cb);
        callbacks[event].splice(cb, 1);
      //If no callback is given, remove all callbacks for this event
      } else {
        callbacks[event].length = 0;
      }
      return self; //self for chaining
    };

    function promiseDone(value, isError) {
      fireEvent('done', [value, isError]);
      if (isError) fireEvent('error', [value]);
      else fireEvent('success', [value]);
      numPending--;
    }
    function fireEvent(event, params) {
      angular.forEach(callbacks[event], function(cb) {
        cb.apply(self, params || []);
      });
    }
    // Add any old promise to our tracking
    // startParam is simply a parameter to pass to the 'start' callback
    // it's usually an http config object
    self.addPromise = function(promise, startParam) {
      numPending++;
      fireEvent('start', [startParam]);
      return promise.then(function success(value) {
        promiseDone(value);
        return value;
      }, function error(value) {
        promiseDone(value, true);
        return $q.reject(value);
      });
    };
  }
  return function(trackerName) {
    if (!trackers[trackerName]) trackers[trackerName] = new Tracker(trackerName);
    return trackers[trackerName];
  };
}])

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.responseInterceptors.push('trackerResponseInterceptor');
}])

.factory('trackerResponseInterceptor', ['$q', 'promiseTracker', '$injector', 
function($q, promiseTracker, $injector) {
  //We use $injector get around circular dependency problem for $http
  var $http;
  return function spinnerResponseInterceptor(promise) {
    if (!$http) $http = $injector.get('$http'); 
    
    //We know the latest request is always going to be last in the list
    var requestConfig = $http.pendingRequests[$http.pendingRequests.length-1];
    var trackerConfig;
    if ((trackerConfig = requestConfig.tracker)) {
      if (!angular.isArray(trackerConfig)) {
        trackerConfig = [trackerConfig];
      }
      angular.forEach(trackerConfig, function(trackerName) {
        promiseTracker(trackerName).addPromise(promise, requestConfig);
      });
    }
    return promise;
  };
}]);
