'use strict';

angular.module('galleryapp')
    .controller('galleryAppController', ['$scope','appConstants', function($scope, appConstants) {
        $scope.title = 'Gallery App';
        $scope.appConstants = appConstants;
    }]);
