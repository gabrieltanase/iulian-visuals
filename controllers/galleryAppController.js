'use strict';

angular.module('galleryapp')
    .controller('galleryAppController', ['$scope', '$location','appConstants', 'contentModel',
        function($scope, $location, appConstants, contentModel) {

            function splitArray(items, numberOfItemsPerRow) {
                var newArray = [], i, len;

                numberOfItemsPerRow = Number(parseInt(numberOfItemsPerRow)) == numberOfItemsPerRow ? numberOfItemsPerRow : 1; // default 1

                for (i = 0; i < items.length; i += numberOfItemsPerRow) {
                    newArray.push(items.slice(i, i + numberOfItemsPerRow));
                }

                return newArray;
            }

            // Content
            contentModel.loadContent().then(function() {
                $scope.content = contentModel.content;
                $scope.imagesArray = splitArray($scope.content.images, appConstants.galleryRows);
            }, function() {
                $scope.content = null;
            });


            // Binds
            $scope.templates = appConstants.templates;
    }]);
