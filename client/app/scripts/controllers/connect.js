'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ConnectCtrl
 * @description
 * # ConnectCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ConnectCtrl', function ($scope, Connect) {
   
  	$scope.user = {};
  	Connect.one().get().then(function(data, status, headers, config) {
  		console.log(data);

  		$scope.user = status;
  	});

  });
