"use strict";
exports.__esModule = true;
exports.config = void 0;
var dotenv = require('dotenv');
var bunyan = require("bunyan");
//import dotenv and reassign it in config file , to use it!
dotenv.config({}); //make sure dotenv file in root directory
var Config = /** @class */ (function () {
    function Config() {
        this.DEFAULT_DB_URL = 'mongodb://localhost:27017/chatty-backend';
        this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DB_URL;
        this.SECRET_KEY_1 = process.env.SECRET_KEY_1 || '';
        this.SECRET_KEY_2 = process.env.SECRET_KEY_2 || '';
        this.CLIENT_URL = process.env.CLIENT_URL || '';
        this.JWT_TOKEN = process.env.JWT_TOKEN || '';
        this.NODE_ENV = process.env.NODE_ENV || 'development';
        this.PORT = process.env.PORT || '5000';
        this.REDIS_HOST = process.env.REDIS_HOST || '';
    }
    Config.prototype.createLogger = function (name) {
        return bunyan.createLogger({ name: name, level: 'debug' });
    };
    Config.prototype.validateConfig = function () {
        for (var _i = 0, _a = Object.entries(this); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (value === undefined || value === null || value === '') {
                throw new Error("Invalid configuration for ".concat(key));
            }
        }
    };
    return Config;
}());
exports.config = new Config(); //created instance of class and exported
