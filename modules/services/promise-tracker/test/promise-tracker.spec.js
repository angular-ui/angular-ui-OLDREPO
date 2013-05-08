describe('Promise Tracker', function() {
  beforeEach(module('ui.services'));
  
  var promiseTracker, $httpBackend, $http, $q, $rootScope;
  beforeEach(inject(function(_promiseTracker_, _$httpBackend_, _$http_, _$q_, _$rootScope_) {
    promiseTracker = _promiseTracker_;
    $httpBackend = _$httpBackend_;
    $http = _$http_;
    $q = _$q_;
    $rootScope = _$rootScope_;
  }));

  function digest() {
    $rootScope.$apply();
  }

  describe('factory', function() {
    var myTracker;
    beforeEach(function() {
      myTracker = promiseTracker('myTracker');
    });

    it('should create a new tracker', function() {
      expect(myTracker).toBeTruthy();
    });

    it('should get the tracker each time myTracker(name) is called', function() {
      expect(promiseTracker('myTracker')).toBe(myTracker);
    });

    it('should be inactive at start', function() {
      expect(myTracker.active()).toBe(false);
    });

    it('should add a promise and return it', function() {
      var deferred = $q.defer();
      expect(typeof myTracker.addPromise(deferred.promise)).toBe('object');
    });

    it('should allow you to add callbacks of the right type', function() {
      myTracker.on('start', angular.noop);
      myTracker.on('success', angular.noop);
      myTracker.on('error', angular.noop);
      myTracker.on('done', angular.noop);
    });

    it('should throw error if you add callback of wrong type', function() {
      expect(function() { myTracker.on('sarayu', angular.noop); }).toThrow();
    });

    it('should allow you to remove callbacks of the right type', function() {
      myTracker.off('start');
      myTracker.off('success');
      myTracker.off('error');
      myTracker.off('done');
    });

    it('should throw error if you remove callback of wrong type', function() {
      expect(function() { myTracker.off('sarayu'); }).toThrow();
    });

    describe('after adding a promise', function() {
      var deferred;
      beforeEach(function() {
        deferred = $q.defer();
        myTracker.addPromise(deferred.promise);
      });

      it('should be active at first', function() {
        expect(myTracker.active()).toBe(true);
      });
      it('should be inactive after resolving promise', function() {
        deferred.resolve();
        digest();
        expect(myTracker.active()).toBe(false);
      });
      it('should be inactive after rejecting promise', function() {
        deferred.reject();
        digest();
        expect(myTracker.active()).toBe(false);
      });
      it('should stay active while at least one promise is active', function() {
        var d1 = $q.defer();
        myTracker.addPromise(d1.promise);
        expect(myTracker.active()).toBe(true);
        d1.resolve();
        digest();
        expect(myTracker.active()).toBe(true);
        deferred.reject();
        digest();
        expect(myTracker.active()).toBe(false);
      });
      
      describe('events', function() {
        var events = ['success','error','done','start'];
        var callbacks, count;

        beforeEach(function() {
          callbacks = {}, count = {};
          //Automatically create callbacks for all events, which just add to
          //a count for that event
          angular.forEach(events, function(event) {
            count[event] = 0;
            callbacks[event] = function(amount) { count[event] += amount; };
          });
          angular.forEach(events, function(e) {
            myTracker.on(e, callbacks[e]);
          });
        });

        it('should fire "start" with param when promise is added', function() {
          expect(count.start).toBe(0);
          myTracker.addPromise($q.defer().promise, 3);
          expect(count.start).toBe(3);
        });
        it('should fire "done" with param when promise is resolved or rejected', function() {
          expect(count.done).toBe(0);
          var deferred = $q.defer();
          myTracker.addPromise(deferred.promise);
          deferred.resolve(11);
          digest();
          expect(count.done).toBe(11);
          deferred = $q.defer();
          myTracker.addPromise(deferred.promise);
          deferred.reject(22);
          digest();
          expect(count.done).toBe(33);
        });
        it('should fire "error" with param when promise is rejected', function() {
          expect(count.error).toBe(0);
          var deferred = $q.defer();
          myTracker.addPromise(deferred.promise);
          deferred.reject(7);
          digest();
          expect(count.error).toBe(7);
        });
        it('should fire "success" with param when promise is resolve', function() {
          expect(count.success).toBe(0);
          var deferred = $q.defer();
          myTracker.addPromise(deferred.promise);
          deferred.resolve(9);
          digest();
          expect(count.success).toBe(9);
        });
        it('should fire all events, at right times', function() {
           var deferred = $q.defer();
           myTracker.addPromise(deferred.promise, 5);
           expect(count.start).toBe(5);
           deferred.resolve(6);
           digest();
           expect(count.done).toBe(6);
           expect(count.success).toBe(6);
           expect(count.error).toBe(0);
           expect(count.start).toBe(5);
           deferred = $q.defer();
           myTracker.addPromise(deferred.promise, 7);
           expect(count.start).toBe(12);
           deferred.reject(8);
           digest();
           expect(count.done).toBe(14);
           expect(count.success).toBe(6);
           expect(count.error).toBe(8);
           expect(count.start).toBe(12);
        });
        it('should unbind only given function', function() {
          var called;
          myTracker.on('start', function() {
            called = true;
          });
          myTracker.off('start', callbacks.start);
          var deferred = $q.defer();
          myTracker.addPromise(deferred.promise, 5);
          expect(count.start).toBe(0);
          expect(called).toBeTruthy();
        });
        it('should unbind all functions if none given', function() {
          var called;
          myTracker.on('start', function() {
            called = true;
          });
          myTracker.off('start');
          var deferred = $q.defer();
          myTracker.addPromise(deferred.promise, 5);
          expect(count.start).toBe(0);
          expect(called).toBeFalsy();
        });
      });
    });
  });

  describe('http interceptor', function() {
    var tracky;
    beforeEach(function() {
      tracky = promiseTracker('tracky');
      $httpBackend.whenGET("/pizza").respond("pepperoni");
      $httpBackend.whenGET("/pie").respond("apple");
      $httpBackend.whenGET("/error").respond(500, "monkeys");
    });

    it('should not track an http request with no tracker option', function() {
      $http.get('/pizza');
      expect(tracky.active()).toBe(false);
      $httpBackend.flush();
      expect(tracky.active()).toBe(false);
    });

    it('should track an http request with tracker option', function() {
      $http.get('/pizza', { tracker: 'tracky' });
      expect(tracky.active()).toBe(true);
      $httpBackend.flush();
      expect(tracky.active()).toBe(false);
    });

    it('should create a new tracker if http request gives new name', function() {
      $http.get('/pizza', { tracker: 'jonny' });
      expect(promiseTracker('jonny').active()).toBe(true);
      $httpBackend.flush();
      expect(promiseTracker('jonny').active()).toBe(false);
    });

    it('should bind to two trackers if an array of trackers is given', function() {
      var t1 = promiseTracker('t1');
      var t2 = promiseTracker('t2');
      $http.get('/pizza', { tracker: ['t1', 't2'] });
      expect(t1.active()).toBe(true);
      expect(t2.active()).toBe(true);
      $httpBackend.flush();
      expect(t1.active()).toBeFalsy();
      expect(t2.active()).toBeFalsy();
    });

    describe('binding events', function() {
      var callbacks, responses;
      beforeEach(function() {
        var events = ['success','start','done','error'];
        callbacks = {}, responses = {};
        angular.forEach(events, function(e) {
          responses[e] = [];
          callbacks[e] = function(response) {
            responses[e].push(response);
          };
          tracky.on(e, callbacks[e]);
        });
      });

      it('should call success, start, done callbacks', function() {
        $http.get('/pizza', { tracker: 'tracky' });
        expect(responses.start[0].url).toBe('/pizza');
        $httpBackend.flush();
        expect(responses.done[0].data).toBe('pepperoni');
        expect(responses.success[0].data).toBe('pepperoni');
      });
      it('should call success and error callbacks', function() {
        $http.get('/error', { tracker: 'tracky' });
        $httpBackend.flush();
        expect(responses.done[0].data).toBe('monkeys');
        expect(responses.error[0].data).toBe('monkeys');
      });
    });
  });
});
