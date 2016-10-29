(function() {
  angular
    .module('app.home')
    .controller('home', Home);

  Home.$inject = ['socket'];

  function Home(socket) {
    var vm = this;

    socket.on('kill', function(npcInfo) {
      console.log(npcInfo);
    });
  }
}());
