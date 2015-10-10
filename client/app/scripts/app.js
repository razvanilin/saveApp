'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngResource',
    'ngRoute',
    'restangular'
  ])
  .config(function ($routeProvider, RestangularProvider, $httpProvider, $locationProvider) {

    RestangularProvider.setBaseUrl("http://localhost:3000");

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/connect', {
        templateUrl: 'views/connect.html',
        controller: 'ConnectCtrl',
        controllerAs: 'connect'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('ConnectRestangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setRestangularFields({
        id: '_id'
      });
    });
  })
  .factory('Connect', function(ConnectRestangular) {
    return ConnectRestangular.service('connect');
  });
