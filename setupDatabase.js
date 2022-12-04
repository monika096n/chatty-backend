"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var config_1 = require("./config");
var logger = config_1.config.createLogger('setupDatabase'); //log statement 
exports["default"] = (function () {
    function connectToDB() {
        logger.info('Trying to connect Mongo Db! ');
        mongoose_1["default"].connect("".concat(config_1.config.DATABASE_URL))
            .then(function () {
            logger.info('123!');
            logger.info('Connected to Mongo database Successfully! ');
        })["catch"](function (error) {
            logger.error('Error connecting to Mongo database!', error);
            return process.exit(1);
        });
    }
    connectToDB(); //Connects to Mongo database
    mongoose_1["default"].connection.on('disconnected', connectToDB); //retrying after if it disconnects on errors
});
