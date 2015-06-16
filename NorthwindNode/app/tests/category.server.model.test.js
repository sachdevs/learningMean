'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Category = mongoose.model('Category');

/**
 * Globals
 */
var user, category;

/**
 * Unit tests
 */
describe('Category Model', function() {

    describe('Saving', function() {
        it('saves new record', function(done) {
            var category = new Category({
                name: 'Beverages',
                description: 'stuff, stuff, stuff, and more stuff'
            });

            category.save(function(err, saved) {
                should.not.exist(err);
                done();
            });
        });

        it('throws validation error when name is empty', function(done) {
            var category = new Category({
                description: 'no nonono name'
            });

            category.save(function(err, saved) {
                err.errors.name.message.should.equal('name cannot be blank');
                done();
            });
        });

        it('throws validation error when name longer than 15 chars', function(done) {
            var category = new Category({
                name: 'Grains/Cereals/Chocolates'
            });

            category.save(function(err, saved) {
                should.exist(err);
                err.errors.name.message.should.equal('name must be 15 chars in length or less');
                done();
            });
        });

        it('throws validation error for duplicate category name', function(done) {
            var category = new Category({
                name: 'Beverages'
            });

            category.save(function(err) {
                should.not.exist(err);

                var duplicate = new Category({
                    name: 'Beverages'
                });

                duplicate.save(function(err2) {
                	it(err);
                    err.indexOf('$name').should.not.equal(-1);
                    err.indexOf('duplicate key error').should.not.equal(-1);
                    should.exist(err2);
                    done();
                });
            });
        });
    });
    afterEach(function(done) {
        // NB this deletes ALL categories (but is run against a test database)
        Category.remove().exec();
        done();
    });
});
