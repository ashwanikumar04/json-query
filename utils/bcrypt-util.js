/*jslint node: true */

var bcrypt = require('bcrypt');
var saltRounds = 10;
var Promise = require("bluebird");

var bcryptUtil = function () {

    var getHash = function getHash(password) {
        return new Promise(function (resolve, reject) {
            
            bcrypt.hash(password, saltRounds,
                function (err, hash) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(hash);
                    }
                });
        });
    };

    var compare = function getHash(password, hash) {
        return new Promise(function (resolve, reject) {
            bcrypt
                .compare(password, hash, function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        if (res === true) {
                            resolve(res);
                        }
                        else {
                            reject(new Error("Hash did not match"));
                        }
                    }
                });
        });
    };

    return {
        getHash: getHash,
        compare: compare
    };

};

module.exports = bcryptUtil();
