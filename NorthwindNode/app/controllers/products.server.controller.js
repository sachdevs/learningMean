'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    _ = require('lodash');

var crud = require('./crud.server.controller')('Product', 'name');

module.exports = crud;