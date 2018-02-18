(function () {
    function JsonQueryController($scope, $location, $rootScope, $interval, jsonQueryService, Flash, ngDialog) {
        $rootScope.$emit("onTabChanged", 8);
        $scope.gistUrl = "";
        $scope.rightEditor = "hello";
        $scope.generateGist = function () {
            jsonQueryService
                .generateGist($scope.rightEditor)
                .then(function (response) {
                    var apiData = response.data.data;
                    console.log(apiData);
                    $scope.gistUrl = apiData.html_url;
                }).catch(function (err) {
                    Flash.create('danger', err.data.message, 'custom-class');
                });
        };
    }

    angular.module('jsonQuery.controllers.query', [])
        .controller("JsonQueryController", ['$scope', '$location', '$rootScope', '$interval', 'jsonQueryService', "Flash", "ngDialog", JsonQueryController]);
}());