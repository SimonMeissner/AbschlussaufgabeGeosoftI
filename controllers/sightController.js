var Sight = require('../models/sight');
var Tour = require('../models/tour');

var async = require('async');

exports.index = function(req, res) {
    async.parallel({
        sight_count: function(callback) {
            Sight.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        tour_count: function(callback) {
            Tour.countDocuments({}, callback);
        },
    }, function(err, results) {
        res.render('index', { title: 'Cityguide Home', error: err, data: results });
    });
};

// Display list of all sights.
exports.sight_list = function(req, res) {
    res.send('NOT IMPLEMENTED: sight list');
};

// Display detail page for a specific sight.
exports.sight_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: sight detail: ' + req.params.id);
};

// Display sight create form on GET.
exports.sight_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: sight create GET');
};

// Handle sight create on POST.
exports.sight_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: sight create POST');
};

// Display sight delete form on GET.
exports.sight_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: sight delete GET');
};

// Handle sight delete on POST.
exports.sight_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: sight delete POST');
};

// Display sight update form on GET.
exports.sight_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: sight update GET');
};

// Handle sight update on POST.
exports.sight_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: sight update POST');
};
