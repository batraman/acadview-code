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
	.when('/restaurant/:id', {
		templateUrl: 'pages/restaurant.html',
		controller: 'restaurantController'
	})
})

foodieApp.controller('restaurantController',function($scope,$routeParams,$http) {
	$scope.restaurantId = $routeParams.id;
	var restaurants = [{
		name: 'Farzi Cafe',
		id: 1,
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
		id: 2,
		address: 'D-14, 3rd Floor, South Extension 2, New Delhi',
		location: 'South Extension 2',
		category: 'Casual Dining, Bar',
		vote: '4.0',
		cuisines: 'North Indian, Chinese, Italian',
		cost: '1300',
		hours: '12 Noon to 1 AM',
		bestDish: {
			name: 'Corn Pizza',
			image: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
		},
		image: 'https://b.zmtcdn.com/data/res_imagery/18306530_RESTAURANT_12af6daf0c583de02db40bc95052bad9.jpg'
	},
	{
		name: 'Alkauser',
		id: 3,
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
		id: 4,
		address: 'Dome, Level 4, Select Citywalk, A-3, District Centre, Saket, New Delhi',
		location: 'Saket',
		category: 'Casual Dining',
		vote: '4.8',
		cuisines: 'Asian, Chinese,Thai, Japanese',
		cost: '2000',
		hours: '12 Noon to 1 AM',
		image: 'https://b.zmtcdn.com/data/res_imagery/18429148_RESTAURANT_433edbeec2decc62911522378eca7fa8.jpg'
	}]
	$scope.restaurant = restaurants[$routeParams.id - 1]
	$scope.ingredients = [];
	$scope.getIngredients = function(url) {
	var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'
	$http({
		'method': 'POST',
		'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
		'headers': {
			'Authorization': 'Key dc8c9f31f7694303b94309a2c4052356',
			'Content-Type': 'application/json'
		},
		'data': data
	}).then(function (response) {
			var ingredients = response.data.outputs[0].data.concepts;
  			// var list = '';
  			for (var i =0;i<ingredients.length;i++) {
  				$scope.ingredients.push(ingredients[i].name)
  			}
    		// $('.ingredients').html(list);
    		// console.log(list);
        }, function (xhr) {
        	console.log(xhr);
        })
	}
})


foodieApp.controller('loginController',function($scope,$location) {
	$scope.goToHome = function() {
		// console.log('Do Something')
		// console.log($location.url());
		$location.url('home')
	}
})

foodieApp.controller('mainController',function($scope) {
	// $scope.restaurants = ['Farzi Cafe','Pizza Hut','Wenger\'s Deli','Sagar Ratna'];

	$scope.restaurants = [{
		name: 'Farzi Cafe',
		id: 1,
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
		id: 2,
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
		id: 3,
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
		id: 4,
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