'use strict'
angular.module('starter')

.controller('user-profile-controller', function($scope,$localStorage,FacebookService,$state,$http) {
	
	FacebookService.getUserFacebook().then(function(res){
		$scope.fb_user = res.data;
	});

	$scope.logout = function(){
		FacebookService.logout();
		$state.go('app.oauth')
	}
});