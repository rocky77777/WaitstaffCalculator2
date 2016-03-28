var app = angular.module('wcApp', ['ngRoute']);

var viewChoice;
var isHome = false;
var isMealDetails = false;
var isEarnings = false;

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider

	.when('/choices/:choice', {
		templateUrl : 'theView.html',
		controller : 'NewMealCtrl',
		resolve : {
			choice: function(appChoices, $route, $location) {
				var choice = $route.current.params.choice;
				if(appChoices.indexOf(choice) === -1 ) {
					$location.path('/error');
					return;
				}
				viewChoice = choice;
				return choice;
			}
		}
	})

	// .when('/Home', {
	// 	templateUrl : 'home.html',
	// 	controller : 'HomeCtrl as home'
	// })
	// .when('/New Meal', {
	// 	templateUrl : 'newMeal.html',
	// 	controller : 'NewMealCtrl as nmCtrl'
	// })
	// .when('/My Earnings', {
	// 	templateUrl : 'myEarnings.html',
	// 	controller : 'MyEarningsCtrl as meCtrl'
	// })
.when('/error', {
	template : '<p>Error - Page Not Found</p>'
})
.otherwise('/error');
}])
.controller('HomeCtrl', function($scope) {
	this.message = "Hi from home controller.";
})
.controller('NewMealCtrl', function($scope) {

	// if(viewChoice === "Home") {
	// 	document.getElementById("a").innerHTML = '<div class="appExplanationParagraphDiv"><p class="appExplanationParagraph">This app tracks your earnings as a waiter. To enter a new meal, click the "New Meal" tab and enter the info, then click the submit button. To view your earnings over the entire duration, click the "My Earnings" tab. The rest is self-explanatory.</p></div>';
	// } else if(viewChoice === "New Meal") {
	// 	document.getElementById('a').innerHTML = '<div class="mealDetailsSide"><div class="mealDetailsBox"><form name="mealDetailsForm" novalidate><h2>Enter the meal details</h2><hr /><p class="bmp">Base Meal Price: $<input type="number" name="basePrice" ng-model="data.basePrice" required></p><p class="tr">Tax Rate: %<input type="number" ng-model="data.taxRate" required></p><p>Tip Percentage: %<input type="number" ng-model="data.tipPercentage" required></p><div class="buttons"><button ng-click="submit()">Submit</button><button ng-click="cancel()">Cancel</button></div><p ng-if="submitted && mealDetailsForm.$error.required">Make sure all fields are filled out!</p></form></div></div><div class="customerAndEarningsSide"><div class="customerChargesBox"><h2>Customer Charges</h2><hr />'+
	// 	'<div class="ccInfo"><span class="subTotal">Subtotal: </span><span ng-show="showCustomerChargesBox">{{computeSubtotal(data.basePrice, data.taxRate) | currency}}</span><br /><span class="tip">Tip: </span><span ng-show="showCustomerChargesBox">{{computeTip(data.tipPercentage) | currency}}</span><hr /><span class="total">Total: </span><span ng-show="showCustomerChargesBox">{{computeTotal() | currency}}</span></div></div></div>';
	// }

	// console.log("viewChoice = "+viewChoice);
	// if(viewChoice === "Home") {
	// 	isHome = true;
	// }

	$scope.data = {
		tipTotal: 0,
		mealCount: 0,
		avgTipPerMeal: 0
	};
	var subT = 0;
	var tip = 0;
	var total = 0;
	var tipTotal = 0;
	var mealCount = 0;
	var avgTipPerMeal = 0;
	showCustomerChargesBox = false;
	showMyEarningsBox = false;
	$scope.submitted = false;
	$scope.computeSubtotal = function(mealPrice, tax) {
		subT = mealPrice + (mealPrice * (tax / 100));
		return subT;
	}
	$scope.computeTip = function(tipPerc) {
		tip = subT * (tipPerc / 100);
		return tip;
	}
	$scope.computeTotal = function () {
		total = subT + tip;
		return total;
	}
	$scope.submit = function() {
		$scope.submitted = true;
		if($scope.mealDetailsForm.$valid) {
			$scope.showCustomerChargesBox = true;
			$scope.showMyEarningsBox = true;
			$scope.data.tipTotal = $scope.data.tipTotal + tip;
			$scope.data.mealCount ++;
			$scope.submitted = false;
		}
	}
	$scope.cancel = function() {
		$scope.data.basePrice = "";
		$scope.data.taxRate = "";
		$scope.data.tipPercentage = "";
		$scope.showCustomerChargesBox = false;
	}
	$scope.reset = function() {
		$scope.data.tipTotal = 0;
		$scope.data.mealCount = 0;
		$scope.data.basePrice = "";
		$scope.data.taxRate = "";
		$scope.data.tipPercentage = ""; 
		$scope.showCustomerChargesBox = false;
		$scope.showMyEarningsBox = false;
	}
	$scope.computeAvgTip = function(totalTip, mealsCount) {
		return totalTip / mealsCount;
	}



	// if(viewChoice === "Home") {
	// 	isMealDetails = false;
	// 	isEarnings = false;
	// 	isHome = true;
	// } else if(viewChoice === "New Meal") {
	// 	isHome = false;
	// 	isEarnings = false;
	// 	isMealDetails = true;
	// } else if(viewChoice === "My Earniners") {
	// 	isHome = false;
	// 	isMealDetails = false;
	// 	isEarnings = true;
	// }

})
.controller('MyEarningsCtrl', function($scope) {
	this.message = "This is a message from MyEarningsCtrl";
})
.value('appChoices', ['Home', 'New Meal', 'My Earnings']);

//put html in js and try to render it using if statement?