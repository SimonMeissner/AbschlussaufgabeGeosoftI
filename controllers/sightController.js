var mongoose = require('mongoose')
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
exports.sight_detail = function(req, res, next) {
    
    
    var id = mongoose.Types.ObjectId(req.params.id);
    
    Sight.findById(id)
    .exec(function(err, sight){
        if(err) { return next(err);}
        if(sight==null) { //No Sight found
            var err = new Error('Sight not found');
            err.status = 404;
            return next(err);
        }
        //Successful, so render
        res.render('sight_detail', {title: 'Sight Detail', sight: sight})
    }); 
}    


// Display sight create form on GET.
exports.sight_create_get = function(req, res, next) {
    res.render('sight_form', { title: 'Create Sight'});
};


// Handle Genre create on POST.
exports.sight_create_post =  [

    // Validate and santize the name field.
    body('name').trim().isLength({ min: 1 }).escape().withMessage('Sight name required'),
    body('link').trim().isLength({ min: 1 }).withMessage('Sight link required'),
    
    
  
    // Process request after validation and sanitization.
    (req, res, next) => {
  
      // Extract the validation errors from a request.
      const errors = validationResult(req);
        console.log('Coordinates sieht so aus: ' + req.body.coordinates)
        
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
                          description: 'not available'
                      },
                      "geometry": {
                          "type": "Polygon",
                          coordinates: JSON.parse('[' + req.body.coordinates + ']' ) //Have to pass [[Numbers]] instead of [[[Numbers]]] because of error with JSON.parse()
                          
                      }
                  }
              ]
          }
      );
          
      
      console.log('Coordinates sieht so aus: ' + sight.features[0].geometry.coordinates)
      
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('sight_form', { title: 'Create Sight', sight: sight, errors: errors.array()});
        return;
      }
      else {

        sight.save(function (err) {
            if (err) { return next(err); }
            res.redirect('/cityguide/sight/');
        });
        
        //Weil das nicht funktioniert hat, anderer Weg zur Überprüfung ob sight mit diesem namen schon existiert. Über Schema(unique: true)
        /*


        // Data from form is valid.
        // Check if Sight with same name already exists.

        
         Sight.findOne({ 'features[0].properties.name' : req.body.name })
          .exec( function(err, found_sight) {
                console.log(req.body)
                console.log(found_sight.features[0].properties.name)
             if (err) { return next(err); }
  
             if (found_sight) {
               // Sight exists, redirect to its detail page.
               //res.redirect(found_sight.url);
               console.log("Sight with same name exists!")
               res.redirect('/sight/')
             }
             else {
  
               sight.save(function (err) {
                 if (err) { return next(err); }
                 // Sight saved. Redirect to Sight detail page.
                 //res.redirect(sight.url);
                 res.redirect('/sight/');
               });
  
             }
  
           }); */
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


// Displays impressum
exports.impressum = function(req, res) {
        res.render('impressum', { title: 'Impressum'});
};