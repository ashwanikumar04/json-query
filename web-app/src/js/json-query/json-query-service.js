﻿(function () {
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
        var fetchData = function (curl) {
            return $http.post('/api/v1/query/curl', {
                "curl": curl
            });
        };
        var getDefaultLibraries = function () {
            return [{
                    "name": "Lodash",
                    "url": "https://cdn.jsdelivr.net/npm/lodash@4.17.5/lodash.min.js",
                    "documentationUrl": "https://lodash.com/"
                },
                {
                    "name": "Underscore",
                    "url": "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js",
                    "documentationUrl": "http://underscorejs.org/"
                },
            ];
        };

        var getSupportedLibraries = function () {
            var libraries = localStorageService.get("libraries") || [];
            if (libraries.length == 0) {
                localStorageService.set("libraries", getDefaultLibraries());
            }
            return localStorageService.get("libraries");
        };

        var addNewLibrary = function (library) {
            var libraries = getSupportedLibraries();
            libraries.push(library);
            localStorageService.set("libraries", libraries);
            return getSupportedLibraries();
        };

        var deleteLibrary = function (library) {
            var libraries = getSupportedLibraries();
            var newLibraries = [];
            for (var index = 0; index < libraries.length; index++) {
                if (libraries[index].name !== library.name) {
                    newLibraries.push(libraries[index]);
                }
            }
            localStorageService.set("libraries", newLibraries);
            return getSupportedLibraries();
        };
        var saved = function () {
            return localStorageService.get("savedCode");
        };
        var saveLocally = function (code, url) {
            var savedCode = saved();
            if (!savedCode) {
                savedCode = [];
            }
            savedCode.push({
                code: code,
                url: url,
                timestamp: new Date()
            });
            localStorageService.set("savedCode", savedCode);
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
            getDefaultObject: getDefaultObject,
            addNewLibrary: addNewLibrary,
            deleteLibrary: deleteLibrary,
            saveLocally: saveLocally,
            fetchData: fetchData
        };
    };
    angular.module('jsonQuery.services', [])
        .factory("jsonQueryService", ["$http", "$location", '$rootScope', "localStorageService", jsonQueryService]);
}());