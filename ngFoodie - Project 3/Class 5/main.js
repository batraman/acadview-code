var foodieApp = angular.module('foodieApp',['ngRoute']);

foodieApp.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	})
	.when('/home',{
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	})
})

foodieApp.controller('loginController',function($scope,$location) {
	$scope.goToHome = function() {
		console.log('Hello')
		$location.url('home')
	}
})

foodieApp.controller('mainController',function($scope) {
	// $scope.restaurants = ['Farzi Cafe','Pizza Hut','Wenger\'s Deli','Sagar Ratna'];

	$scope.restaurants = [{
		name: 'Farzi Cafe',
		address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
		location: 'Connaught Place',
		category: 'Casual Dining, Bar',
		vote: '4.2',
		cuisines: 'Modern Indian',
		cost: '2200',
		hours: '12 Noon to 1 AM (Mon-Sun)',
		image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
	},
	{
		name: 'Circus',
		address: 'D-14, 3rd Floor, South Extension 2, New Delhi',
		location: 'South Extension 2',
		category: 'Casual Dining, Bar',
		vote: '4.0',
		cuisines: 'North Indian, Chinese, Italian',
		cost: '1300',
		hours: '12 Noon to 1 AM',
		image: 'https://b.zmtcdn.com/data/res_imagery/18306530_RESTAURANT_12af6daf0c583de02db40bc95052bad9.jpg'
	},
	{
		name: 'Alkauser',
		address: 'Corner of Kautilya Marg, Near Assam Bhawan, Chanakyapuri, New Delhi',
		location: 'Chanakyapuri',
		category: 'Takeaway, Delivery',
		vote: '4.0',
		cuisines: 'North Indian, Lucknowi, Rolls',
		cost: '800',
		hours: '4:30PM to 10:30PM',
		image: 'https://b.zmtcdn.com/data/res_imagery/303349_RESTAURANT_440428373094241b9f6ee9855b8da069.jpg'
	},
	{
		name: 'Pa Pa Ya',
		address: 'Dome, Level 4, Select Citywalk, A-3, District Centre, Saket, New Delhi',
		location: 'Saket',
		category: 'Casual Dining',
		vote: '4.8',
		cuisines: 'Asian, Chinese,Thai, Japanese',
		cost: '2000',
		hours: '12 Noon to 1 AM',
		image: 'https://b.zmtcdn.com/data/res_imagery/18429148_RESTAURANT_433edbeec2decc62911522378eca7fa8.jpg'
	}]
})