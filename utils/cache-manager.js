/*jslint node: true */
var Promise = require("bluebird");
var helpers = require('./helpers');
var config = require('../config');
var inMemoryCache = require('./in-memory-cache');

var cacheManager = function () {
    return inMemoryCache;
};
module.exports = cacheManager();