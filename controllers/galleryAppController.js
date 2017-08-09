'use strict';

angular.module('galleryapp')
    .controller('galleryAppController', ['$scope', '$location','appConstants', 'contentModel', 'imageStateService',
        function($scope, $location, appConstants, contentModel, imageStateService) {

            function splitArray(items, numberOfItemsPerRow) {
                var newArray = [], i, len;

                numberOfItemsPerRow = Number(parseInt(numberOfItemsPerRow)) == numberOfItemsPerRow ? numberOfItemsPerRow : 1; // default 1

                for (i = 0; i < items.length; i += numberOfItemsPerRow) {
                    newArray.push(items.slice(i, i + numberOfItemsPerRow));
                }

                return newArray;
            }

            function openImage(imagePath) {
                imageStateService.setImagePath(imagePath);
                $location.path('/image');
            }

            function close() {
                $location.path('/');
            }

            // Content
            contentModel.loadContent().then(function() {
                $scope.content = contentModel.content;
                $scope.imagesArray = splitArray($scope.content.images, appConstants.galleryRows);
            }, function() {
                $scope.content = null;
            });

            $scope.source = imageStateService.getImagePath();


            // Binds
            $scope.templates = appConstants.templates;
            $scope.openImage = openImage;
            $scope.close = close;
    }]);
