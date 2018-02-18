(function () {
    function JsonQueryController($scope, $location, $rootScope, $interval, jsonQueryService, Flash, ngDialog, angularLoad) {
        $rootScope.$emit("onTabChanged", 8);
        $scope.gistUrl = "";
        $scope.rightEditor = "";
        $scope.libraries = jsonQueryService.getSupportedLibraries();
        var loadLibrary = function loadLibrary(url) {
            angularLoad
                .loadScript(url)
                .then(function () {

                }).catch(function () {
                    Flash.create('danger', "Some error occurred while loading the library", 'custom-class');
                });
        };
        var formatJson = function (data) {
            return JSON.stringify(data, null, 4);
        };
        $scope.format = function () {
            $scope.input = formatJson(JSON.parse($scope.input));
        };
        $scope.loadLibrary = function () {
            loadLibrary($scope.selectedLibrary.url);
        };

        // _.forEach(input,function(o){
        //     console.log(o); 
        //  });
        $scope.run = function () {
            var input = JSON.parse($scope.input);
            var F = new Function("input", $scope.rightEditor);
            return (F(input));
        };
        $scope.generateGist = function () {
            if (!$scope.rightEditor) {
                Flash.create('danger', "Please enter any code to save.", 'custom-class');
                return;
            }
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
        loadLibrary($scope.libraries[0].url);
        $scope.input = formatJson(jsonQueryService.getDefaultObject());
    }

    angular.module('jsonQuery.controllers.query', [])
        .controller("JsonQueryController", ['$scope', '$location', '$rootScope', '$interval', 'jsonQueryService', "Flash", "ngDialog", "angularLoad", JsonQueryController]);
}());