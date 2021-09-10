var Sight = require('../models/sight');
var Tour = require('../models/tour');
var async = require('async');
const { body,validationResult } = require("express-validator");


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
    res.render('sight_form', { title: 'Create new Sight' });
};

// Handle sight create on POST.
exports.sight_create_post = [

    // Validate and santize the fields.
    // Validation of geojson should be done by mongoose-geojson package??
    body('name', 'Sight name required').trim().isLength({ min: 1 }).escape(),
    body('weburl', 'Web URL required').trim().isLength({ min: 1}).escape(),
    body('geojson', 'GeoJSON required').trim().isLength({ min: 1}).escape(),
  
    // Process request after validation and sanitization.
    (req, res, next) => {
  
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a sight object with escaped and trimmed data.
      // description still missing
      var sight = new Sight({
          name: req.body.name,
          weburl: req.body.weburl,
          geojson: req.body.geojson
      });
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('sight_form', { title: 'Create new Sight', sight: sight, errors: errors.array()});
        return;
      }
      else {
        // Data from form is valid.
        // Check if Sight with same name already exists.
        Sight.findOne({ 'name': req.body.name })
          .exec( function(err, found_sight) {
             if (err) { return next(err); }
  
             if (found_sight) {
               // Sight exists, redirect to its detail page.
               res.redirect(found_sight.url);
             }
             else {
  
               sight.save(function (err) {
                 if (err) { return next(err); }
                 // Sight saved. Redirect to sight detail page.
                 res.redirect(sight.url);
               });
  
             }
  
           });
      }
    }
  ];

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
