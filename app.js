require('./db');
var app = require('./routerSevices');
var port = process.env.PORT || 8080,
DataWareHouseTools = require('./API/controllers/dataWareHouseCtrl');

// console.log("Server ready with static content!");

app.listen(port, function () {
    console.log('ACME-Explorer RESTful API server started on: ' + port);
});

DataWareHouseTools.createDataWareHouseJob();