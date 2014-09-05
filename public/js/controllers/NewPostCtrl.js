saleMe.controller('NewPostCtrl', function($scope, $location,  SaleMeFactory) {

    $scope.post = { user : "", title : "", content :"" };

    var currPost = {};

    $scope.save = function () {
        var postToSave  =  { post: $scope.post };
        
        SaleMeFactory.savePosts(postToSave)
            .success(function (data) {
                $scope.post = data;
            })
            .error(function (error) {
                $scope.status = 'Unable to save data: ' + error.message;
            });
    };
});
