var config = require('../../config');
var apiConstants = function () {

    return {
        cacheBaseKeys: {},
        completedStatus: {
            NA: "na",
            PASS: "pass",
            FAIL: "fail",
            NO_REVIEW: "no_review"
        },
        errorCodes: {

        }
    };
};

module.exports = apiConstants();