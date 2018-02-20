(function () {
    function SnippetController($scope, $location) {
        $scope.cancel = function () {
            $scope.currentDialog.close();
        };
       
    }

    angular.module('jsonQuery.controllers.snippet', [])
        .controller("SnippetController", ['$scope', '$location', SnippetController]);
}());