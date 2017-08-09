'use strict';

angular.module('galleryapp').filter('trustAsHtml', ['$sce', function($sce) {
    return $sce.trustAsHtml;
}]);
