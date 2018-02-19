(function () {
    function JsonQueryController($scope, $location, $rootScope, $interval, jsonQueryService, Flash, ngDialog, angularLoad) {
        $rootScope.$emit("onTabChanged", 8);
        $scope.rightEditor = "";
        $scope.libraries = jsonQueryService.getSupportedLibraries();
        $scope.selectedLibrary = $scope.libraries[0];
        $scope.newLibrary = {};
        var loadLibrary = function loadLibrary(url) {
            angularLoad
                .loadScript(url)
                .then(function () {

                }).catch(function () {
                    Flash.create('danger', "Some error occurred while loading the library", 'custom-class');
                });
        };
        var formatObject = function (data) {
            return JSON.stringify(data, null, 4);
        };
        $scope.format = function () {
            $scope.input = formatObject(JSON.parse($scope.input));
        };
        $scope.loadLibrary = function () {
            loadLibrary($scope.selectedLibrary.url);
        };

        $scope.run = function () {
            var input = JSON.parse($scope.input);
            var result = eval($scope.rightEditor);
            $scope.resultEditor = formatObject(result);

        };
        $scope.add = function () {
            $scope.isAddNewLibrary = true;
        };
        $scope.cancel = function () {
            $scope.isAddNewLibrary = false;
        };
        $scope.addLibrary = function () {
            $scope.libraries = jsonQueryService.addNewLibrary($scope.newLibrary);
            $scope.selectedLibrary = $scope.libraries[0];
            $scope.isAddNewLibrary = false;
            $scope.newLibrary = {};
        };
        $scope.deleteLibrary = function () {
            $scope.libraries = jsonQueryService.deleteLibrary($scope.selectedLibrary);
            console.log($scope.libraries);
            $scope.selectedLibrary = $scope.libraries[0];
        };
        var validBeforeSave = function () {
            if (!$scope.rightEditor) {
                Flash.create('danger', "Please enter any code to save.", 'custom-class');
                return false;
            }
            return true;
        };
        $scope.saveLocally = function () {
            if (validBeforeSave()) {
                jsonQueryService.saveLocally($scope.rightEditor, "");
            }
        };
        $scope.generateGist = function () {
            if (validBeforeSave()) {
                jsonQueryService
                    .generateGist($scope.rightEditor)
                    .then(function (response) {
                        var apiData = response.data.data;
                        jsonQueryService.saveLocally($scope.rightEditor, apiData.html_url);
                    }).catch(function (err) {
                        Flash.create('danger', err.data.message, 'custom-class');
                    });
            }
        };
        loadLibrary($scope.selectedLibrary.url);
        $scope.input = formatObject(jsonQueryService.getDefaultObject());
    }

    angular.module('jsonQuery.controllers.query', [])
        .controller("JsonQueryController", ['$scope', '$location', '$rootScope', '$interval', 'jsonQueryService', "Flash", "ngDialog", "angularLoad", JsonQueryController]);
}());