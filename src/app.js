"use strict";
exports.__esModule = true;
var config_1 = require("@root/config");
var setupServer_1 = require("@root/setupServer");
var express = require("express");
var setupDatabase_1 = require("@root/setupDatabase");
var Application = /** @class */ (function () {
    function Application() {
    }
    Application.prototype.initialize = function () {
        this.loadConfig(); //loading all configuration values from env->config->app level use
        (0, setupDatabase_1["default"])(); //database connection
        var app = express(); //creates express server
        var server = new setupServer_1.ChattyServer(app);
        server.start();
    };
    Application.prototype.loadConfig = function () {
        config_1.config.validateConfig();
    };
    return Application;
}());
var application = new Application();
application.initialize();
