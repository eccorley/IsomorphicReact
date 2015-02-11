/**
 * Initialize our isomorphic app.
 */

var Router = require('./router/index');
var routes = require('./routes');
var router = new Router(routes);

module.exports = router;
