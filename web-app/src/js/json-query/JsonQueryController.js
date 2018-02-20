(function () {
    function JsonQueryController($scope, $location, $rootScope, $interval, jsonQueryService, Flash, ngDialog, angularLoad) {
        $scope.rightEditor = "";
        $scope.libraries = jsonQueryService.getSupportedLibraries();
        $scope.selectedLibrary = $scope.libraries[0];
        $scope.newLibrary = {};
        $scope.curlRequest = "";
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
            $scope.newLibrary = {};
            $scope.isAddNewLibrary = false;
        };
        $scope.enableInternetRequest = function () {
            $scope.isInternetRequest = true;
        };
        $scope.disableInternetRequest = function () {
            $scope.curlRequest = "";
            $scope.isInternetRequest = false;
        };
        $scope.fetchData = function () {
            if ($scope.curlRequest && $scope.curlRequest.indexOf('curl') >= 0) {
                jsonQueryService
                    .fetchData($scope.curlRequest)
                    .then(function (response) {
                        var apiData = response.data.data;
                        $scope.input = formatObject(JSON.parse(apiData));
                        $scope.disableInternetRequest();
                    }).catch(function (err) {
                        Flash.create('danger', err.data.message, 'custom-class');
                    });

            } else {
                Flash.create('danger', "Please enter valid curl request", 'custom-class');
                return;
            }
        };
        $scope.addLibrary = function () {
            var newLibrary = $scope.newLibrary;
            if (newLibrary.name && newLibrary.url && newLibrary.documentationUrl) {
                $scope.libraries = jsonQueryService.addNewLibrary($scope.newLibrary);
                $scope.selectedLibrary = $scope.libraries[0];
                $scope.close();
            } else {
                Flash.create('danger', "Please enter all the entries", 'custom-class');
            }
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
        $scope.showSavedSnippets = function (item) {
            if ($scope.currentDialog) {
                $scope.currentDialog.close();
            }
            var savedSnippets = jsonQueryService
                .savedSnippets();
            console.log(savedSnippets);
            $scope.snippets = savedSnippets;
            $scope.currentDialog = ngDialog.open({
                template: '/snippets.html',
                controller: 'SnippetController',
                scope: $scope
            });
        };
        $scope.select = function (selectedCode) {
            $scope.rightEditor = selectedCode;
            if ($scope.currentDialog) {
                $scope.currentDialog.close();
            }
            $scope.run();
        };
        loadLibrary($scope.selectedLibrary.url);
        $scope.input = formatObject(jsonQueryService.getDefaultObject());
        $interval($scope.run, 5 * 1000);
    }

    angular.module('jsonQuery.controllers.query', [])
        .controller("JsonQueryController", ['$scope', '$location', '$rootScope', '$interval', 'jsonQueryService', "Flash", "ngDialog", "angularLoad", JsonQueryController]);
}());