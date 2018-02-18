(function () {
    var MainController = function ($scope, $rootScope, jsonQueryService, $location, Flash) {
        $scope.selectedTab = -1;
        $scope.isLoggedIn = false;
        $rootScope.$on("onTabChanged", function (event, tab) {
            console.log(tab);
            $scope.isLoggedIn = true;
            $scope.selectedTab = tab;
        });
    };
    angular.module('jsonQuery.controllers.main', [])
        .controller("MainController", ["$scope", "$rootScope", "jsonQueryService", '$location', "Flash", MainController]);
}());