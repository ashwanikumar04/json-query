(function () {
    var MainController = function ($scope, $rootScope, jsonQueryService, $location, Flash) {
    };
    angular.module('jsonQuery.controllers.main', [])
        .controller("MainController", ["$scope", "$rootScope", "jsonQueryService", '$location', "Flash", MainController]);
}());