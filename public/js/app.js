var saleMe =  angular.module('saleMe', ['ngRoute','ngUpload']).config([ '$routeProvider', '$locationProvider','$httpProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider.when('/', { controller: 'MainCtrl', templateUrl: 'views/home.html' }).
        when('/main-wall', { controller: 'PostsCtrl', templateUrl: 'views/blog.html' }).
        when('/post', { controller: 'BlogItemCtrl', templateUrl: 'views/blog-item.html' }).
        when('/newPost', { controller: 'NewPostCtrl', templateUrl: 'views/newPost.html' }).
        when('/registration', { controller: 'RegistrationCtrl', templateUrl: 'views/registration.html' }).
        otherwise({ redirectTo: '/' });
	}
	]);

var urlPosts = '/api/posts/' ;
var urlUsers = '/api/users/' ;

saleMe.factory('SaleMeFactory', function ($http) {
    return {
        savePosts: function(post) {
            return $http.post(urlPosts, post);
        },
        getAllPosts: function() {
            return $http.get(urlPosts);
        }
        
    };
});


