'use strict';

angular.module('galleryapp')
    .controller('galleryAppController', ['$scope','appConstants', 'contentModel',
        function($scope, appConstants, contentModel) {

            contentModel.loadContent().then(function(){
                // console.log(contentModel.content);
            })
            $scope.title = 'Gallery App';
            $scope.appConstants = appConstants;
    }]);
