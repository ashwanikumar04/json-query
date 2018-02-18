var config = require('../config');
var CustomError = require("../models/common/errors/custom-error");
var dateTimeUtil = require("./date-time-util");

var errorCodes = require("../models/common/errors/error-codes");

var helpers = function () {
    var getFloat = function getFloat(text) {
        var number = parseFloat(parseTextForNumber(text));
        return isNaN(number) ? 0 : number;
    };

    var parseTextForNumber = function parseTextForNumber(text) {
        var matches = text.replace(/,/g, '').match(/(\+|-)?((\d+(\.\d+)?)|(\.\d+))/);
        return matches && matches[0] || null;
    };
    var replaceAll = function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    };
    var getParam = function getParam(req, param) {
        var returnParam = req.body[param] || req.params[param] || req.headers[param] || req.query[param];
        return returnParam;
    };
    var getUrl = function getUrl(req) {
        return req.protocol + '://' + req.get('host') + req.originalUrl;
    };

    return {
        parseTextForNumber: parseTextForNumber,
        getFloat: getFloat,
        urlEncode: function (str) {
            str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
            return new Buffer(str).toString('base64');
        },
        urlDecode: function (str) {
            str = this.unescape(str);
            return new Buffer(str, 'base64').toString('ascii');
        },
        unescape: function (str) {
            str += Array(5 - str.length % 4).join('=');
            return str.replace(/\-/g, '+').replace(/_/g, '/');
        },
        replaceAll: replaceAll,
        getParam: getParam,
        getUrl: getUrl
    };
};
module.exports = helpers();