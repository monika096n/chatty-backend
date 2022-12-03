"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var config_1 = require("./config");
exports["default"] = (function () {
    function connectToDB() {
        console.log('Trying to connect Mongo Db! ');
        mongoose_1["default"].connect("".concat(config_1.config.DATABASE_URL))
            .then(function () {
            console.log('123!');
            console.log('Connected to Mongo database Successfully! ');
        })["catch"](function (error) {
            console.log('Error connecting to Mongo database!', error);
            return process.exit(1);
        });
    }
    connectToDB(); //Connects to Mongo database
    mongoose_1["default"].connection.on('disconnected', connectToDB); //retrying after if it disconnects on errors
});
