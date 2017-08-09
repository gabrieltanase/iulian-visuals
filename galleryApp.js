'use strict'

angular.module('galleryapp',[
    'ngRoute',
    'ngResource'
]).constant('appConstants', {
    templates: {
        home: 'templates/home.html'
    },
})
.config(['$routeProvider', 'appConstants', function($routeProvider, appConstants){
    $routeProvider.when('/', {
        templateUrl: appConstants.templates.home,
        controller: 'galleryAppController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
