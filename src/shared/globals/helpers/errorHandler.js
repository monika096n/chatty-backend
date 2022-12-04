"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ServerError = exports.FileTooLargeError = exports.NotAuthorizedError = exports.NotFoundError = exports.BadRequestError = exports.JoiRequestValidationError = exports.CustomError = void 0;
var HTTP_STATUS_CODE = require("http-status-codes");
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(message) {
        return _super.call(this, message) || this;
    }
    CustomError.prototype.serializeErrors = function () {
        return {
            message: this.message,
            status: this.status,
            statusCode: this.statusCode
        };
    };
    return CustomError;
}(Error));
exports.CustomError = CustomError;
var JoiRequestValidationError = /** @class */ (function (_super) {
    __extends(JoiRequestValidationError, _super);
    function JoiRequestValidationError(message) {
        var _this = 
        //can't create object and call directly for abstact classes , so we have constructor for child classes
        _super.call(this, message) || this;
        _this.statusCode = HTTP_STATUS_CODE.BAD_REQUEST; //400
        //over-writing value declared in parent class
        _this.status = 'error';
        return _this;
    }
    return JoiRequestValidationError;
}(CustomError));
exports.JoiRequestValidationError = JoiRequestValidationError;
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(message) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = HTTP_STATUS_CODE.BAD_REQUEST; //400
        _this.status = 'error';
        return _this;
    }
    return BadRequestError;
}(CustomError));
exports.BadRequestError = BadRequestError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = HTTP_STATUS_CODE.NOT_FOUND; //404
        _this.status = 'error';
        return _this;
    }
    return NotFoundError;
}(CustomError));
exports.NotFoundError = NotFoundError;
var NotAuthorizedError = /** @class */ (function (_super) {
    __extends(NotAuthorizedError, _super);
    function NotAuthorizedError(message) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = HTTP_STATUS_CODE.UNAUTHORIZED; //401
        _this.status = 'error';
        return _this;
    }
    return NotAuthorizedError;
}(CustomError));
exports.NotAuthorizedError = NotAuthorizedError;
var FileTooLargeError = /** @class */ (function (_super) {
    __extends(FileTooLargeError, _super);
    function FileTooLargeError(message) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = HTTP_STATUS_CODE.REQUEST_TOO_LONG; //413
        _this.status = 'error';
        return _this;
    }
    return FileTooLargeError;
}(CustomError));
exports.FileTooLargeError = FileTooLargeError;
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError(message) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = HTTP_STATUS_CODE.SERVICE_UNAVAILABLE; //503
        _this.status = 'error';
        return _this;
    }
    return ServerError;
}(CustomError));
exports.ServerError = ServerError;
