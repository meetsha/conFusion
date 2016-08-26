'use strict';

angular.module('confusionApp', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider

        .when('/contactus', {//for contactus page
            templateUrl: 'contactus.html',
            controller: 'ContactController'
        })

        .when('/menu', {//for menu page
            templateUrl: 'menu.html',
            controller: 'MenuController'
        })

        .when('/menu/:id', {//for dishdetail page
            templateUrl: 'dishdetail.html',
            controller: 'DishDetailController'
        })

        .otherwise('/contactus');
    })

;
