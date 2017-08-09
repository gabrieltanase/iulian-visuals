'use strict';

angular.module('galleryapp')
    .factory('imageStateService', function() {
        var imageStateService;

        imageStateService = {
            imagePath: null,

            setImagePath: function(imagePath) {
                this.imagePath = imagePath;
            },

            getImagePath: function() {
                return this.imagePath;
            }
        }

        return imageStateService;
    })
