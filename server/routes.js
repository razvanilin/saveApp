var config = require('./settings');

var routes = {};
routes['/user'] = require('./controllers/testController');

module.exports = routes;