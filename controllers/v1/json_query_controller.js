/*jslint node: true */
var logger = require('../../utils/logger');
var responseMaker = require('../../utils/response-maker');
var CustomError = require('../../models/common/errors/custom-error');
var errorCodes = require('../../models/common/errors/error-codes');
var config = require('../../config');
var apiConstants = require('../../models/common/api-constants');
var _ = require("lodash");
var axios = require('axios');
var shell = require('shelljs');

var queryController = function () {
    var generateGist = function (req, res) {
        return axios({
                url: 'https://api.github.com/gists',
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                data: req.body
            })
            .then(function (response) {
                return response.data;
            })
            .then(function (data) {
                return responseMaker
                    .prepareResponse(null, data, res, {});
            })
            .catch(function (err) {
                return responseMaker
                    .prepareResponse(err, null, res, {});
            });
    };

    var fetchData = function (req, res) {
        curl(req.body.curl)
            .then(function (response) {
                return response;
            })
            .then(function (data) {
                return responseMaker
                    .prepareResponse(null, data, res, {});
            })
            .catch(function (err) {
                return responseMaker
                    .prepareResponse(err, null, res, {});
            });
    };

    function curl(data) {
        return new Promise(function (resolve, reject) {
            shell.exec(data, function (code, stdout, stderr) {
                if (code === 0) {
                    resolve(stdout);
                } else {
                    reject(stderr);
                }
            });

        });
    }


    return {
        generateGist: generateGist,
        fetchData: fetchData
    };
};

module.exports = queryController;