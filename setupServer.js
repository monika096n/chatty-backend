"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ChattyServer = void 0;
var express_1 = require("express");
var config_1 = require("./config");
var http = require("http");
var cookieSession = require('cookie-session');
var helmet = require('helmet');
var hpp = require("hpp");
var cors = require("cors");
var compression = require("compression");
var socket_io_1 = require("socket.io"); //socket.io.Server connection
var redis_1 = require("redis"); //redis for fetching instant chats
var redis_adapter_1 = require("@socket.io/redis-adapter");
//redis adapter connection for direct communication between chats and redis 
var SERVER_PORT = config_1.config.PORT;
var ChattyServer = /** @class */ (function () {
    function ChattyServer(app) {
        this.app = app;
    }
    ChattyServer.prototype.start = function () {
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.routesMiddleware(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
    };
    //method function_variable:returnType;
    ChattyServer.prototype.securityMiddleware = function (app) {
        app.use(cookieSession({
            name: 'session',
            keys: [config_1.config.SECRET_KEY_1, config_1.config.SECRET_KEY_2],
            maxAge: 24 * 7 * 3600000,
            secure: config_1.config.NODE_ENV !== 'development'
        }));
        app.use(helmet()); //add more headers and hide sensitive information
        app.use(hpp()); //prevent same query names 
        app.use(cors({
            origin: "*",
            credentials: true,
            methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
            optionsSuccessStatus: 200
        }));
    };
    ChattyServer.prototype.standardMiddleware = function (app) {
        app.use(compression());
        app.use((0, express_1.json)({ limit: '50mb' }));
        app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    };
    ChattyServer.prototype.routesMiddleware = function (app) {
    };
    ChattyServer.prototype.globalErrorHandler = function (app) {
    };
    ChattyServer.prototype.createSocketIO = function (httpServer) {
        return __awaiter(this, void 0, void 0, function () {
            var io, pubClient, subClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        io = new socket_io_1.Server(httpServer, {
                            cors: {
                                origin: config_1.config.CLIENT_URL,
                                methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
                            }
                        });
                        pubClient = (0, redis_1.createClient)({ url: config_1.config.REDIS_HOST });
                        subClient = pubClient.duplicate();
                        return [4 /*yield*/, Promise.all([pubClient.connect(), subClient.connect()])];
                    case 1:
                        _a.sent();
                        io.adapter((0, redis_adapter_1.createAdapter)(pubClient, subClient));
                        console.log("Created IO!");
                        return [2 /*return*/, io];
                }
            });
        });
    };
    ChattyServer.prototype.startServer = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            var httpServer, socketIO, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        httpServer = new http.Server(app);
                        return [4 /*yield*/, this.createSocketIO(httpServer)];
                    case 1:
                        socketIO = _a.sent();
                        this.startHttpServer(httpServer);
                        this.SocketIOConnections(socketIO);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw new Error(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChattyServer.prototype.startHttpServer = function (httpServer) {
        console.log('httpServer started with pid at:  ', process.pid);
        httpServer.listen(SERVER_PORT, function () {
            console.log('server listening on port at', SERVER_PORT);
        });
    };
    ChattyServer.prototype.SocketIOConnections = function (io) {
    };
    return ChattyServer;
}());
exports.ChattyServer = ChattyServer;
//hpp -> move same name query to queryPolluted  as arrays
// GET /search?firstname=John&firstname=Alice&lastname=Doe
// =>
// req: {
//     query: {
//         firstname: 'Alice',
//         lastname: 'Doe',
//     },
//     queryPolluted: {
//         firstname: [ 'John', 'Alice' ]
//     }
// }
