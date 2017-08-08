'use strict';

angular.module('galleryapp')
    .factory('contentModel', ['$http', '$q', function($http, $q){
        var contentModel,
            contentDefer;

        contentModel = {
            content: null,
            loadContent: function(refresh) {
                var self = this,
                    url = '../content/images.json';

                if (contentDefer && !refresh) {
                    return contentDefer.promise;
                }

                contentDefer = $q.defer();

                $http.get(url).then(function(result) {
                    console.log(result);
                    contentDefer.resolve();
                }, contentDefer.reject);

                return contentDefer.promise;
            }
        };

        return contentModel;
    }])
