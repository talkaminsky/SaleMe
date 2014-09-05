saleMe.controller('PostsCtrl', function($scope, $location,  SaleMeFactory) {
    
    $scope.get = function () {
            SaleMeFactory.getAllPosts()
                .success(function (data) {
                    $scope.posts = data;
                })
                .error(function (error) {
                    $scope.status = 'Unable to get data: ' + error.message;
                });
        };
    
    $scope.get();
});
