var app = angular.module('app', ['moderateContent']);

app.config(function (moderateContentConfigProvider) {
    moderateContentConfigProvider.setCensored('http://www.rockcellarmagazine.com/wp-content/uploads/2014/11/censored.jpg');
    moderateContentConfigProvider.setFallback(true);
    });


app.controller('mainController', ['$scope', function($scope){

    $scope.images = [
        "http://farm2.staticflickr.com/1506/24341851419_96c8e6934e_b.jpg"
    ];

    $scope.addImage = function(){
        $scope.images.unshift($scope.newImage);
    };


}]);

