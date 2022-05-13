"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
exports.configure = exports.stateListener = exports.callService = exports.shadowState = void 0;
// Based on https://github.com/keesschollaart81/vscode-home-assistant/blob/master/src/language-service/src/home-assistant/socket.ts
var WebSocket = require("ws");
var home_assistant_js_websocket_1 = require("home-assistant-js-websocket");
var MSG_TYPE_AUTH_REQUIRED = 'auth_required';
var MSG_TYPE_AUTH_INVALID = 'auth_invalid';
var MSG_TYPE_AUTH_OK = 'auth_ok';
var ERR_CANNOT_CONNECT = 1;
var ERR_INVALID_AUTH = 2;
exports.shadowState = {};
var callService = function () {
    throw new Error('Connection was not initialized');
};
exports.callService = callService;
var stateListener = function () {
    throw new Error('Connection was not initialized');
};
exports.stateListener = stateListener;
var configure = function (_a) {
    var url = _a.url, access_token = _a.access_token;
    return __awaiter(void 0, void 0, void 0, function () {
        var createSocket, connection, states;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    createSocket = function () {
                        console.log('[Auth phase] Initializing WebSocket connection to Home Assistant', url);
                        var connect = function (triesLeft, promResolve, promReject) {
                            console.log("[Auth Phase] Connecting to Home Assistant... Tries left: ".concat(triesLeft), url);
                            var socket = new WebSocket(url, {
                                rejectUnauthorized: false
                            });
                            // If invalid auth, we will not try to reconnect.
                            var invalidAuth = false;
                            var closeMessage = function (ev) {
                                var errorMessage;
                                if (ev && ev.code && ev.code !== 1000) {
                                    errorMessage = "WebSocket connection to Home Assistant closed with code ".concat(ev.code, " and reason ").concat(ev.reason);
                                }
                                closeOrError(errorMessage);
                            };
                            var errorMessage = function (ev) {
                                // If we are in error handler make sure close handler doesn't also fire.
                                socket.removeEventListener('close', closeMessage);
                                var errMessage = 'Disconnected from Home Assistant with a WebSocket error';
                                if (ev.message) {
                                    errMessage += " with message: ".concat(ev.message);
                                }
                                closeOrError(errMessage);
                            };
                            var closeOrError = function (errorText) {
                                if (errorText) {
                                    console.log("WebSocket Connection to Home Assistant closed with an error: ".concat(errorText));
                                }
                                if (invalidAuth) {
                                    promReject(ERR_INVALID_AUTH);
                                    return;
                                }
                                // Reject if we no longer have to retry
                                if (triesLeft === 0) {
                                    // We never were connected and will not retry
                                    promReject(ERR_CANNOT_CONNECT);
                                    return;
                                }
                                var newTries = triesLeft === -1 ? -1 : triesLeft - 1;
                                // Try again in a second
                                setTimeout(function () { return connect(newTries, promResolve, promReject); }, 1000);
                            };
                            // Auth is mandatory, so we can send the auth message right away.
                            var handleOpen = function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    try {
                                        socket.send(JSON.stringify({
                                            type: 'auth',
                                            access_token: access_token
                                        }));
                                    }
                                    catch (err) {
                                        // Refresh token failed
                                        invalidAuth = err === ERR_INVALID_AUTH;
                                        socket.close();
                                    }
                                    return [2 /*return*/];
                                });
                            }); };
                            var handleMessage = function (event) {
                                var message = JSON.parse(event.data);
                                console.log("[Auth phase] Received a message of type ".concat(message.type), message);
                                switch (message.type) {
                                    case MSG_TYPE_AUTH_INVALID:
                                        invalidAuth = true;
                                        socket.close();
                                        break;
                                    case MSG_TYPE_AUTH_OK:
                                        socket.removeEventListener('open', handleOpen);
                                        socket.removeEventListener('message', handleMessage);
                                        socket.removeEventListener('close', closeMessage);
                                        socket.removeEventListener('error', errorMessage);
                                        socket.haVersion = message.ha_version;
                                        promResolve(socket);
                                        break;
                                    default:
                                        // We already send this message when socket opens
                                        if (message.type !== MSG_TYPE_AUTH_REQUIRED) {
                                            console.log('[Auth phase] Unhandled message', message);
                                        }
                                }
                            };
                            socket.addEventListener('open', handleOpen);
                            socket.addEventListener('message', handleMessage);
                            socket.addEventListener('close', closeMessage);
                            socket.addEventListener('error', errorMessage);
                        };
                        return new Promise(function (resolve, reject) { return connect(3, resolve, reject); });
                    };
                    return [4 /*yield*/, (0, home_assistant_js_websocket_1.createConnection)({
                            createSocket: createSocket
                        })];
                case 1:
                    connection = _b.sent();
                    exports.callService = function (domain, service, serviceData, target) {
                        return (0, home_assistant_js_websocket_1.callService)(connection, domain, service, serviceData, target);
                    };
                    exports.stateListener = function (callback) {
                        connection.subscribeEvents(callback, 'state_changed');
                    };
                    return [4 /*yield*/, (0, home_assistant_js_websocket_1.getStates)(connection)];
                case 2:
                    states = _b.sent();
                    exports.shadowState = states.reduce(function (acc, entity) {
                        var _a;
                        return (__assign(__assign({}, acc), (_a = {}, _a[entity.entity_id] = entity, _a)));
                    }, {});
                    (0, exports.stateListener)(function (event) {
                        exports.shadowState[event.data.entity_id] = event.data.new_state;
                    });
                    return [2 /*return*/, connection];
            }
        });
    });
};
exports.configure = configure;
