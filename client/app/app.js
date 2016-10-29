(function() {
  angular
    .module('app', [
      'ngRoute',
      'app.home'
    ])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: './app/home/home.html',
          controller: 'home',
          controllerAs: 'vm'
        })
        .otherwise({ redirectTo: '/' });
    }]);
}());
