'use strict';

module.exports = function(app) {
	var products = require('../users/products.server.controller');

	app.route('/products')
		.get(products.list)
		.post(products.create);
	app.route('/products/:productId')
		.get(products.read)
		.put(products.update)
		.delete(products.delete);

	app.param('productId', products.getById);
};