'use strict';
angular.module('galleryapp')
    .filter('limitItems', ['$filter', function ($filter) {
        return function (items, numberOfItemsPerRow) {
            var newArray = [], i, len;

            numberOfItemsPerRow = Number(parseInt(numberOfItemsPerRow)) == numberOfItemsPerRow ? numberOfItemsPerRow : 1; // default 1


            for (i = 0; i < items.length; i += numberOfItemsPerRow) {
                newArray.push(items.slice(i, i + numberOfItemsPerRow));

                // if (i < len) {
                //     break;
                // }
            }

            return newArray;
        };
    }]);
