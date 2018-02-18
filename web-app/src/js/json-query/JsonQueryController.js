(function () {
    function JsonQueryController($scope, $location, $rootScope, $interval, jsonQueryService, Flash, ngDialog) {
        $rootScope.$emit("onTabChanged", 8);
        $scope.gistUrl = "";
        $scope.gistText = "";
        $scope.generateGist = function () {
            $scope.revenue = {};
            $scope.apiData = {};
            $scope.visible = false;

            // if (_.isEmpty($scope.gistText)) {
            //     Flash.create('danger', "Please enter text", 'custom-class');
            //     return;
            // }

            var editor = ace.edit("editor");
            editor.setTheme("ace/theme/monokai");
            editor.session.setMode("ace/mode/javascript");
            jsonQueryService
                .generateGist($scope.gistText)
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