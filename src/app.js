"use strict";
exports.__esModule = true;
var setupServer_1 = require("./../setupServer");
var express = require("express");
var Application = /** @class */ (function () {
    function Application() {
    }
    Application.prototype.initialize = function () {
        var app = express(); //creates express server
        var server = new setupServer_1.ChattyServer(app);
        server.start();
    };
    return Application;
}());
var application = new Application();
application.initialize();
