'use strict';

angular.module('galleryapp',[
    'ngRoute',
    'ngResource'
]).constant('appConstants', {
    templates: {
        home: 'templates/home.html',
        header: 'templates/partials/header.html',
        gallery: 'templates/partials/gallery.html'
    },
    galleryRows: 3
})
.config(['$routeProvider', '$locationProvider', 'appConstants', function($routeProvider, $locationProvider, appConstants) {
    $locationProvider.hashPrefix(''); // remove the exclamation sign from '/#!/' => some-path/#/
    $routeProvider.when('/', {
        templateUrl: appConstants.templates.home,
        controller: 'galleryAppController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
