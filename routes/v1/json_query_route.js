var express = require('express');
var routes = function () {
    var queryRoute = express.Router();
    var queryController = require('../../controllers/v1/json_query_controller')();

    queryRoute.route('/gists')
        .post(queryController.generateGist);
    return queryRoute;
};

module.exports = routes;