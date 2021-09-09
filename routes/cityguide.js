var express = require('express');
var router = express.Router();

// Require controller modules.
var sight_controller = require('../controllers/sightController');
var tour_controller = require('../controllers/tourController');

/// SIGHT ROUTES ///

// GET catalog home page.
router.get('/', sight_controller.index);

// GET request for creating a sight. NOTE This must come before routes that display sight (uses id).
router.get('/sight/create', sight_controller.sight_create_get);

// POST request for creating sight.
router.post('/sight/create', sight_controller.sight_create_post);

// GET request to delete sight.
router.get('/sight/:id/delete', sight_controller.sight_delete_get);

// POST request to delete sight.
router.post('/sight/:id/delete', sight_controller.sight_delete_post);

// GET request to update sight.
router.get('/sight/:id/update', sight_controller.sight_update_get);

// POST request to update sight.
router.post('/sight/:id/update', sight_controller.sight_update_post);

// GET request for one sight.
router.get('/sight/:id', sight_controller.sight_detail);

// GET request for list of all sight items.
router.get('/sight', sight_controller.sight_list);

/// TOUR ROUTES ///

// GET request for creating tour. NOTE This must come before route for id (i.e. display tour).
router.get('/tour/create', tour_controller.tour_create_get);

// POST request for creating tour.
router.post('/tour/create', tour_controller.tour_create_post);

// GET request to delete tour.
router.get('/tour/:id/delete', tour_controller.tour_delete_get);

// POST request to delete tour.
router.post('/tour/:id/delete', tour_controller.tour_delete_post);

// GET request to update tour.
router.get('/tour/:id/update', tour_controller.tour_update_get);

// POST request to update tour.
router.post('/tour/:id/update', tour_controller.tour_update_post);

// GET request for one tour.
router.get('/tour/:id', tour_controller.tour_detail);

// GET request for list of all tour.
router.get('/tour', tour_controller.tour_list);


module.exports = router;
