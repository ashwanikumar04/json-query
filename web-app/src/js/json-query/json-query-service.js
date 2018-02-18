(function () {
    var jsonQueryService = function ($http, $location, $rootScope, localStorageService) {
        var generateGist = function (text) {
            return $http.post('/api/v1/query/gists', {
                "description": "Query",
                "public": true,
                "files": {
                    "query.txt": {
                        "content": text
                    }
                }
            });
        };
        return {
            generateGist: generateGist
        };
    };
    angular.module('jsonQuery.services', [])
        .factory("jsonQueryService", ["$http", "$location", '$rootScope', "localStorageService", jsonQueryService]);
}());