'use strict';
module.exports = function (app) {
  var trip = require('../controllers/tripsCtrl');
  var authController = require('../controllers/authCtrl');

  /**
   * Post an trip
   * RequiredRoles: None
   * get an trip 
   * RequiredRoles: None
   * @section application
   * @type post get
   * @url /v1/trips
   * param {string} sortedBy (category)
  */
  app.route('/v1/trips')
    .post(trip.create_an_trip)
    .get(trip.list_all_trips);

  /**
   * get results from a search engine
   *    RequiredRoles: None; 
   * 
   * @section trips
   * @type get
   * @url /v1/trips/search
   * @param {string} startFrom
   * @param {string} pageSize
   * @param {string} sortedBy (created)
   * @param {string} reverse (true|false) 
   * @param {string} keyword //in ticker, title, or description
  */
  app.route('/v1/trips/search')
    .get(trip.search_trips);

  /**
   * Put an trip
   * Delete an trip
   * @section trips
   * @type  put delete
   * @url /v1/trips/:ticker
  */
  app.route('/v1/trips/:ticker')
    .put(trip.update_an_trip);
     
  app.route('/v2/trips')
    .get(authController.verifyUser(['EXPLORER']),
      trip.list_all_trips_status);

 /**
   * RequiredRoles: Manager
   * Get an trip
   * Delete an trip
   * @section trip
   * @type  get post
   * @url /v2/trips/:ticker
  */
  app.route('/v2/trips/:ticker')
    .get(trip.list_a_trip)
    .post(authController.verifyUser(['MANAGER']),
      trip.create_an_trip);

      
 /**
   * RequiredRoles: Manager
   * Get an trip
   * Put an trip
   * Delete and trip
   * @section trip
   * @type  get put delete
   * @url /v2/trips/:ticker
  */
  app.route('/v2/trips/:ticker')
    .get(authController.verifyUser(['MANAGER']),
      trip.list_a_trip)
    .put(authController.verifyUser(['MANAGER']),
      trip.update_an_trip)
    .delete(authController.verifyUser(['MANAGER']),
     trip.delete_an_trip_witout_app);

     /**
   * RequiredRoles: Manager
   * Put an trip
   * @section trip
   * @type put 
   * @url /v2/trips/:ticker
  */

  app.route('/v2/trips/:ticker/cancel')
    .put(authController.verifyUser(['MANAGER']),
      trip.cancel_a_trip);
} 
