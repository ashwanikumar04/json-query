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
        var getSupportedLibraries = function () {
            return [{
                    "name": "Lodash",
                    "url": "https://cdn.jsdelivr.net/npm/lodash@4.17.5/lodash.min.js"
                },
                {
                    "name": "Lodash2",
                    "url": "https://cdn.jsdelivr.net/npm/lodash@4.17.5/lodash.min.js"
                }
            ];
        };

        var getDefaultObject = function () {
            return [{
                    "name": "Java",
                    "version": "9"
                },
                {
                    "name": "C#",
                    "version": "7"
                },
                {
                    "name": "Scala",
                    "version": "NA"
                }
            ];
        };

        return {
            generateGist: generateGist,
            getSupportedLibraries: getSupportedLibraries,
            getDefaultObject: getDefaultObject
        };
    };
    angular.module('jsonQuery.services', [])
        .factory("jsonQueryService", ["$http", "$location", '$rootScope', "localStorageService", jsonQueryService]);
}());