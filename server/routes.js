var config = require('./settings');

var routes = {};
routes['/connect'] = require('./controllers/ConnectController');

module.exports = routes;