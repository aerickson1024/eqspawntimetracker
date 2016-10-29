(function() {
  angular
    .module('app')
    .factory('socket', Socket);

  Socket.$inject = [];

  function Socket() {
    var socket = io.connect();

    return {
      on: function(eventName, callback) {
        socket.on(eventName, callback);
      },
      emit: function(eventName, data) {
        socket.emit(eventName, data);
      }
    };
  }
}());
