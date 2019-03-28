'use strict';
module.exports = function (app) {
  var application = require('../controllers/applicationsCtrl');
  var authController = require('../controllers/authCtrl');

    /**
     * Get an application  
     * RequiredRoles: None
     * @section application
     * @type get
     * @url /v1/applications
     * @param {string} sortedBy (status)
    */
    app.route('/v1/applications/:status')
        .get(application.search_applications);
     

    /**
     * Post an applications   
     * @section applications
     * @type post
     * @url /v1/application
    */
    app.route('/v1/applications')
        .post(application.create_an_application);

    /**
     * Put an applications
     * @section applications
     * @type  put delete
     * @url /v1/application/:ticker
     */
    app.route('/v1/applications/:_id')
        .put(application.update_an_application);

    /**
     * Get an applications
     * RequiredRoles: Manager
     * @section applications
     * @type  GET 
     * @url /v2/applications/:_id
     */    
    app.route('/v2/applications/:_id')
        .get(authController.verifyUser(["MANAGER"]),
        application.search_applications); 
    /**
     * Get an applications
     * RequiredRoles: Manager
     * @section applications
     * @type  GET 
     * @url /v2/applications/:_id
     */      

    app.route('/v2/applications')
        .get(authController.verifyUser(["MANAGER"]),
        application.search_applications); 

    app.route('/v2/applications/:_id')
        .put(authController.verifyUser(["MANAGER"]),
        application.change_status);   


        app.route('/v2/applications')
        .get(authController.verifyUser(["EXPLORER"]),
            application.group_status);

    app.route('/v2/applications/:_id')
        .put(authController.verifyUser(["EXPLORER"]),
            application.paytrip);

    app.route('/v2/applications/:_id')
        .delete(authController.verifyUser(["EXPLORER"]),
            application.delete_an_application);


}