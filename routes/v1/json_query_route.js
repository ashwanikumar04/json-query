var express = require('express');
var routes = function () {
    var queryRoute = express.Router();
    var queryController = require('../../controllers/v1/json_query_controller')();

    queryRoute.route('/gists')
        .post(queryController.generateGist);

    queryRoute.route('/curl')
        .post(queryController.fetchData);

    return queryRoute;
};

module.exports = routes;