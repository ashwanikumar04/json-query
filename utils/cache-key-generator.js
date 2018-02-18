/*jslint node: true */
var Promise = require("bluebird");
var helpers = require('./helpers');
var config = require('../config');
var _ = require('lodash');
var apiConstants = require("../models/common/api-constants");

var cacheKeyGenerator = function () {
    var getSeparator = function () {
        return "_";
    };
    var getKey = function getKey(parts) {
        return _.join(parts, getSeparator()) + getSeparator();
    };

    return {
        getKey: getKey,
        getSeparator: getSeparator
    };
};
module.exports = cacheKeyGenerator();