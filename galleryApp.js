'use strict';

angular.module('galleryapp',[
    'ngRoute',
    'ngResource'
]).constant('appConstants', {
    templates: {
        home: 'templates/home.html',
        header: 'templates/partials/header.html',
        gallery: 'templates/partials/gallery.html',
        image: 'templates/partials/image.html'
    },
    galleryRows: 3
})
.config(['$routeProvider', '$locationProvider', 'appConstants', function($routeProvider, $locationProvider, appConstants) {
    $locationProvider.hashPrefix(''); // remove the exclamation sign from '/#!/' => some-path/#/
    $routeProvider.when('/', {
        templateUrl: appConstants.templates.home,
        controller: 'galleryAppController'
    })
    .when('/image', {
        templateUrl: appConstants.templates.image,
        controller: 'galleryAppController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
