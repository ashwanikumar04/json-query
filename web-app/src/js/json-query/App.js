(function () {
    angular
        .module('jsonQuery', ["ngRoute",
            'ngSanitize',
            "jsonQuery.controllers.main",
            "jsonQuery.controllers.query",
            'jsonQuery.services',
            'angular-loading-bar',
            'ngAnimate',
            "flash",
            'ngDialog',
            "LocalStorageModule",
            'ui.ace',
            'angularLoad',
            'ngclipboard'
        ])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider', 'cfpLoadingBarProvider', 'ngDialogProvider'];

    function config($routeProvider, $locationProvider, cfpLoadingBarProvider, ngDialogProvider) {
        ngDialogProvider.setDefaults({
            className: 'ngdialog-theme-default',
            showClose: true,
            closeByDocument: true,
            closeByEscape: true,
            width: "75%",
            height: "40%"
        });
        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.parentSelector = '#loadingContainer';
        cfpLoadingBarProvider.spinnerTemplate = '<div class="center"></div>';
        $routeProvider
            .when("/", {
                controller: 'JsonQueryController',
                templateUrl: 'query.html',
            });
    }

    run.$inject = ['$rootScope', '$location', '$http', "localStorageService"];

    function run($rootScope, $location, $http, localStorageService) {}
}());