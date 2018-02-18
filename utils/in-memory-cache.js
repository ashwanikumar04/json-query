/*jslint node: true */
var Promise = require("bluebird");
var helpers = require('./helpers');
var logger = require("./logger");
var _ = require("lodash");
var CacheKeyGenerator = require('./cache-key-generator');
var NodeCache = require("node-cache");
var cache = new NodeCache({ stdTTL: 90, checkperiod: 120 });

var dateTimeUtil = require("../utils/date-time-util");
dateTimeUtil.setMoment();
var inMemoryCache = function () {
    var getCacheKey = function getCacheKey(req) {
        return helpers.getUrl(req);
    };

    var setInCache = function setInCache(key, data, ttl) {
        var cachedData = {};
        cachedData.data = data;
        cachedData.expiresOn = dateTimeUtil.getEPOCHTime() + (ttl);
        cache.set(key, cachedData, ttl, function (err, value) {
        });
        return cachedData;
    };

    var getFromCache = function getFromCache(key) {
        return new Promise(function (resolve, reject) {
            return cache
                .get(key, function (err, value) {
                    if (!err && value) {
                        logger.debug(value);
                        resolve(value);
                    } else {
                        reject(new Error("No data"));
                    }
                });
        });
    };

    var deleteKey = function (key) {
        cache
            .del(key, function (err) {

            });
    };
    var clearCache = function () {
        cache.flushAll();
    };

    var getKeys = function (pattern) {
        return new Promise(function (resolve, reject) {
            return cache
                .keys(function (err, keys) {
                    if (!err) {
                        if (pattern) {
                            resolve(_.filter(keys, function (key) {
                                return _.startsWith(key, pattern);
                            }));
                        }
                        else {
                            resolve(keys);
                        }
                    } else {
                        reject(err);
                    }
                });
        });
    };
    return {
        getCacheKey: getCacheKey,
        setCache: setInCache,
        getFromCache: getFromCache,
        cache: cache,
        deleteKey: deleteKey,
        clearCache: clearCache,
        getKeys: getKeys
    };
};
module.exports = inMemoryCache();