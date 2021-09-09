var Tour = require('../models/tour');

// Display list of all tour.
exports.tour_list = function(req, res) {
    res.send('NOT IMPLEMENTED: tour list');
};

// Display detail page for a specific tour.
exports.tour_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: tour detail: ' + req.params.id);
};

// Display tour create form on GET.
exports.tour_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: tour create GET');
};

// Handle tour create on POST.
exports.tour_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: tour create POST');
};

// Display tour delete form on GET.
exports.tour_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: tour delete GET');
};

// Handle tour delete on POST.
exports.tour_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: tour delete POST');
};

// Display tour update form on GET.
exports.tour_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: tour update GET');
};

// Handle tour update on POST.
exports.tour_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: tour update POST');
};
