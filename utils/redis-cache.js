/*jslint node: true */
var Promise = require("bluebird");
var helpers = require('./helpers');
var logger = require("./logger");
var config = require('../config');
var apiConstants = require("../models/common/api-constants");

var redis = require("redis"),
    cache = redis.createClient();
cache.select(config.redisDb, function () { /* ... */ });
var CacheKeyGenerator = require('./cache-key-generator');

var dateTimeUtil = require("../utils/date-time-util");
dateTimeUtil.setMoment();
var redisCache = function () {
    var getCacheKey = function getCacheKey(req) {
        return helpers.getUrl(req);
    };

    var setInCache = function setInCache(key, data, ttl) {
        var cachedData = {};
        cachedData.data = data;
        cachedData.expiresOn = dateTimeUtil.getEPOCHTime() + (ttl);
        cache.set(key, JSON.stringify(cachedData), function (err, value) {
        });

        if (!ttl) {
            ttl = apiConstants.cacheClearTimeOuts.DEFAULT_CACHE_TIMEOUT;
            logger.error(new Error("Timeout is set wrong for " + key), {
                key: key
            });
        }
        cache.expire(key, ttl);
        return cachedData;
    };

    var getFromCache = function getFromCache(key) {

        return new Promise(function (resolve, reject) {
            return cache
                .get(key, function (err, value) {
                    if (!err && value) {
                        logger.debug(value);
                        resolve(JSON.parse(value));
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
        cache.flushdb();
    };
    var getKeys = function (pattern) {
        if (!pattern) {
            pattern = "*";
        }
        else {
            pattern = pattern + "*";
        }
        return new Promise(function (resolve, reject) {
            return cache
                .keys(pattern, function (err, keys) {
                    if (!err) {
                        resolve(keys);
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
module.exports = redisCache();