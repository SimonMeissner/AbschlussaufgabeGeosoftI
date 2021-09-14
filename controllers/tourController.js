const Sight = require('../models/sight');
var Tour = require('../models/tour');

var async = require('async'); //require the package "async" to use asynchronous functions
const { body,validationResult } = require("express-validator"); //require the package "express-validator" for easy validation of forms

// Display list of all tours.
exports.tour_list = function(req, res) {
    Tour.find({}, 'name')
    .populate('items')
    .exec(function (err, list_tour) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('tour_list', { title: 'Tour List', tour_list: list_tour });
    });
};

// Display detail page for a specific tour.
exports.tour_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: tour detail: ' + req.params.id);
};

// Display tour create form on GET.
exports.tour_create_get = function(req, res, next) {

    //Get all sights which we can use for adding to our tour.
    async.parallel({
        sights: function(callback) {
            Sight.find(callback);
        }
    }, function(err, result) {
        if(err) { return next(err); }
        res.render('tour_form', { title: 'Create Tour', sights: result.sights});
    });
};

// Handle tour create on POST.
exports.tour_create_post = [

    //Convert the sight to an array.
    (req, res, next) => {
        if(!(req.body.items instanceof Array)){
            if(typeof req.body.items ==='undefinded')
            req.body.items = [];
            else
            req.body.items = new Array(req.body.items);
        }
        console.log(req.body.items)
        next();
    },

    // Validate and sanitize fields.
    body('name').trim().isLength({ min: 1 }).escape().withMessage('Name must be specified.'),
    //body('sight.*').escape(),
    

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var tour = new Tour(
            { 
                name: req.body.name,
                items: req.body.items
            });
            console.log(tour);
          if (!errors.isEmpty()) {
              // There are errors. Render form again with sanitized values/error messages.
  
              // Get all sights for form
              async.parallel({
                  sights: function(callback) {
                      Sight.find(callback);
                  }
              }, function(err, results) {
                  if (err) { return next(err); }
  
                  // Mark our selected genres as checked.
                  for (let i = 0; i < results.sights.length; i++) {
                      if (tour.sight.indexOf(results.sights[i]._id) > -1) {
                          //Current sight is selected. Set "checked" flag
                          results.sights[i].checked='true';
                      }
                  }
                  res.render('tour_form', { title: 'Create Tour', genres:results.sights, tour: tour, errors: errors.array() });
              });
              return;
          }
          else {
              // Data from form is valid. Save tour.
              tour.save(function (err) {
                  if (err) { return next(err); }
                     //successful - redirect to new tour record.
                     //res.redirect(tour.url);
                     res.redirect('/cityguide/tour');
                  });
          }
      }
];
    


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
