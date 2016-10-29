(function() {
  angular
    .module('app.home')
    .controller('home', Home);

  Home.$inject = ['$scope', 'socket'];

  function Home($scope, socket) {
    var vm = this;
    vm.kills = [];

    socket.on('kill', function(killInfo) {
      $scope.$apply(function() {
        vm.kills.push({
          timestamp: killInfo.timestamp,
          name: killInfo.name,
          spawnTime: new Date(killInfo.spawnTime)
        });
      });
    });
  }
}());
