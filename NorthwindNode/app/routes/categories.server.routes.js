'use strict';

module.exports = function(app) {
	var categories = require('../../app/controllers/categories.server.controller');
	// app.route('/categories').get(function(req, res){
	// 	res.json([{ name: 'Beverages' }, { name: 'Condiments' }]);
	// });
	app.route('/categories')
		.get(categories.list)
		.post(categories.create);

	app.route('/categories/:categoryId')
		.get(categories.read)
		.put(categories.update)
		.delete(categories.delete);

	app.param('categoryId', categories.categoryById);
};