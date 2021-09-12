var Sight = require('../models/sight');
var Tour = require('../models/tour');

var async = require('async'); //require the package "async" to use asynchronous functions

const { body,validationResult } = require("express-validator"); //require the package "express-validator" for easy validation of forms



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
exports.sight_list = function(req, res, next) {
    Sight.find()
        .exec(function (err, list_sights) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('sight_list', { title: 'List of Sights', sight_list: list_sights });
        });
};

// Display detail page for a specific sight.
exports.sight_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: sight detail: ' + req.params.id);
};

// Display sight create form on GET.
exports.sight_create_get = function(req, res, next) {
    res.render('sight_form', { title: 'Create Sight'});
};


// Handle Genre create on POST.
exports.sight_create_post =  [

    // Validate and santize the name field.
    body('name', 'Sight name required').trim().isLength({ min: 1 }).escape(),
    //body('link', 'Sight link required').trim().isLength({ min: 1 }).escape(),
    //body('description', 'Sight description required').trim().isLength({ min: 1 }).escape(),
    
  
    // Process request after validation and sanitization.
    (req, res, next) => {
  
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a genre object with escaped and trimmed data.
      var sight = new Sight(
          {
              "type": "FeatureCollection",
              "features": [
                  {
                      "type": "Feature",
                      "properties": {
                          name: req.body.name,
                          link: req.body.link,
                          description: req.body.description
                      },
                      "geometry": {
                          "type": "Polygon",
                          coordinates: req.body.coordinates
                      }
                  }
              ]
          }
      );
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('sight_form', { title: 'Create Sight', sight: sight, errors: errors.array()});
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
                 // Sight saved. Redirect to Sight detail page.
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
