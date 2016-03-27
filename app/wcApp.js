angular.module('wcApp', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'home.html',
		controller : 'HomeCtrl as home'
	})
	.when('/newMeal', {
		templateUrl : 'newMeal.html',
		controller : 'NewMealCtrl as nmCtrl'
	})
	.when('/myEarnings', {
		templateUrl : 'myEarnings.html',
		controller : 'MyEarningsCtrl as meCtrl'
	})
	.when('/error', {
		template : '<p>Error - Page Not Found</p>'
	})
	.otherwise('/error');
}])
.controller('HomeCtrl', function($scope) {
	this.message = "message from HomeCtrl";
})
.controller('NewMealCtrl', function($scope) {
	this.message = "Hi from NewMealCtrl";
})
.controller('MyEarningsCtrl', function($scope) {
	this.message = "This is a message from MyEarningsCtrl";
})