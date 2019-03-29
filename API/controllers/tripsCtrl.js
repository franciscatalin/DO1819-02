'use strict';
//             TRIPS 
var mongoose = require('mongoose'),
    Trip = mongoose.model('Trips');

exports.create_an_trip = function (req, res) {
    //Check if the user is an manager and if not: res.status(403); 
    //"an access token is valid, but requires more privileges"
    // console.log((req.body));
    var new_trip = new Trip(req.body);
    new_trip.save(function (err, trip) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(trip);
        }
    });
};

exports.list_all_trips = function (req, res) {
    Trip.find(function (err, trips) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(trips);
        }
    });
};

exports.list_all_trips_status = function (req, res) {
    //Check if status param exists (status: req.keyWordQuery.status)  

    Trip.find(function (err, trips) {
        if (trip.status == 'PUBLISHED') {
            if (err) {
                res.send(err);
            }
        }
        else {
            // res.append('Trip returned from the trip search');
            console.log("No hay viajes que mostrar");
            res.json(trips);
        }
    });

    console.log('Searching an trip depending on params');
};

exports.list_a_trip = function (req, res) {
    //Check if status param exists (status: req.keyWordQuery.status)  
    Trip.find({ ticker: req.params.ticker }, function (err, trip) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(trip);
        }
    });

    console.log('Searching an trip depending on params');
};

exports.update_an_trip = function (req, res) {
    // console.log((req.body));
    if (req.body.ticker) {
        res.sendStatus(409);
        return;
    }
    req.body.price = 0;
    var updatedPrice = 0;
    req.body.stage.forEach(element => {
        updatedPrice += element.price;
    });
    req.body.price = updatedPrice;

    Trip.findOneAndUpdate(
        { ticker: req.params.ticker },
        req.body,
        { new: true },
        function (err, trip) {
            if (trip.status != 'PUBLISHED') {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(trip);
                }
            }
            else {
                res.status(405).json({ message: 'Update trip with status PUBLISHED is not allowed' });
            }
        });
};



exports.delete_an_trip_witout_app = function (req, res) {
    var query = {
        "trip": (req.params._id),
        "status": {
            "$ne": "CANCELLED"
        }
    };

    Application.find(
        query,
        function (err, applications) {
            if (err) {
                res.send(err);
            }
            else {
                if (applications.length > 0 && res.params.date_start != null) {

                    res.status(405).json({ message: 'You can not delete this trip' });
                    return;
                } else {
                    res.status(200).json({ message: 'You can delete this trip' });
                    Trip.deleteOne(
                        { _id: req.params._id },
                        function (err, trip) {

                            if (err) {
                                res.send(err);
                            }
                            else {
                                res.json({ message: 'Trip successfully deleted' });
                            }
                        });
                }
            }
        });


};

exports.delete_an_trip = function (req, res) {

    Trip.deleteOne(
        { _id: req.params._id },
        function (err, trip) {

            if (err) {
                res.send(err);
            }
            else {
                res.json({ message: 'Trip successfully deleted' });
            }
        });
};

exports.search_trips = (req, res) => {
    // console.log(req.query); 
    // /v1/trips/search?q=viaje&sortedBy=created&reverse=true&pageSize=3&startFrom=3
    var keyWordQuery = {};

    if (req.query.q) {
        keyWordQuery.$text = { $search: req.query.q };
    }

    var skip = 0;
    if (req.query.startFrom) {
        skip = parseInt(req.query.startFrom);
    }

    var limit = 0;
    if (req.query.pageSize) {
        limit = parseInt(req.query.pageSize);
    }

    var sort = "";
    if (req.query.reverse) {
        if (req.query.sortedBy) {
            if (req.query.reverse == "true") sort = "-";
            sort += req.query.sortedBy;
        } else {
            res.status(400).json({ message: 'Missing query parameter sortedBy' });
            return;
        }
    }

    Trip.find(keyWordQuery)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .lean()
        .exec((err, trip) => {
            if (err) {
                res.send(err);
            } else {
                res.send(trip);
            }
        });

};