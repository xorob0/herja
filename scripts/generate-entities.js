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
var src_1 = require("../src");
var fs = require("fs");
var generateEntities = function (_a) {
    var _b = _a.auth, url = _b.url, access_token = _b.access_token, path = _a.config.path;
    return __awaiter(void 0, void 0, void 0, function () {
        var light, binary_sensor, switches;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, src_1.configure)({
                        url: url,
                        access_token: access_token
                    })];
                case 1:
                    _c.sent();
                    console.log("finished configuring");
                    light = {};
                    binary_sensor = {};
                    switches = {};
                    Object.keys(src_1.shadowState).forEach(function (entity_id) {
                        var domain = entity_id.split('.')[0];
                        var name = entity_id.split('.')[1];
                        if (domain === 'light')
                            light[name] = {
                                getState: "get state() { return shadowState[\"".concat(entity_id, "\"]}"),
                                turn_on: "(serviceData = {}) => callService(\"".concat(domain, "\", 'turn_on', serviceData, {entity_id: \"").concat(entity_id, "\"})"),
                                turn_off: "(serviceData = {}) => callService(\"".concat(domain, "\", 'turn_off', serviceData, {entity_id: \"").concat(entity_id, "\"})"),
                                toggle: "(serviceData = {}) => callService(\"".concat(domain, "\", 'toggle', serviceData, {entity_id: \"").concat(entity_id, "\"})")
                            };
                        if (domain === 'switch')
                            switches[name] = {
                                getState: "get state() { return shadowState[\"".concat(entity_id, "\"]}"),
                                turn_on: "(serviceData = {}) => callService(\"".concat(domain, "\", 'turn_on', serviceData, {entity_id: \"").concat(entity_id, "\"})"),
                                turn_off: "(serviceData = {}) => callService(\"".concat(domain, "\", 'turn_off', serviceData, {entity_id: \"").concat(entity_id, "\"})"),
                                toggle: "(serviceData = {}) => callService(\"".concat(domain, "\", 'toggle', serviceData, {entity_id: \"").concat(entity_id, "\"})")
                            };
                        if (domain === 'binary_sensor')
                            switches[name] = {
                                getState: "get state() { return shadowState[\"".concat(entity_id, "\"]}")
                            };
                    });
                    console.log(light);
                    fs.writeFile("".concat(path, "/light.ts"), "import {callService, shadowState, Light} from \"@homeassistant-node/main\"\nconst light: Light = {\n  ".concat(Object.keys(light).reduce(function (acc, entity_id) { return "".concat(acc, "\n  [\"").concat(entity_id, "\"]: {\n    entity_id: \"").concat(entity_id, "\",\n    turn_on: ").concat(light[entity_id].turn_on, ",  \n    turn_off: ").concat(light[entity_id].turn_off, ",  \n    toggle: ").concat(light[entity_id].toggle, "\n    ").concat(light[entity_id].getState, ",  \n  },\n"); }, ''), "}"), console.log);
                    fs.writeFile("".concat(path, "/switch.ts"), "import {callService, shadowState, Switch} from \"@homeassistant-node/main\"\nconst switch: Switch = {\n  ".concat(Object.keys(switches).reduce(function (acc, entity_id) { return "".concat(acc, "\n  [\"").concat(entity_id, "\"]: {\n    entity_id: \"").concat(entity_id, "\",\n    turn_on: ").concat(switches[entity_id].turn_on, ",  \n    turn_off: ").concat(switches[entity_id].turn_off, ",  \n    toggle: ").concat(switches[entity_id].toggle, "\n    ").concat(switches[entity_id].getState, ",  \n  },\n"); }, ''), "}"), console.log);
                    fs.writeFile("".concat(path, "/binary_switch.ts"), "import {callService, shadowState, BinarySensor} from \"@homeassistant-node/main\"\nconst binary_sensor: BinarySensor = {\n  ".concat(Object.keys(binary_sensor).reduce(function (acc, entity_id) { return "".concat(acc, "\n  [\"").concat(entity_id, "\"]: {\n    entity_id: \"").concat(entity_id, "\",\n    ").concat(binary_sensor[entity_id].getState, ",  \n  },\n"); }, ''), "}"), console.log);
                    return [2 /*return*/];
            }
        });
    });
};
generateEntities({ auth: {
        url: "ws://10.200.0.5:8123/api/websocket",
        access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjMWIyNDM4OTMzYjM0ZGRkYTM2OWVjMDQ0NGQ2NGQwMiIsImlhdCI6MTY1MjA5ODM0OCwiZXhwIjoxOTY3NDU4MzQ4fQ.OdqlEOZo-uwo4qZPaxkmmwwlf6OwhmySIutzitDbm3g"
    }, config: { path: "/tmp" } });
exports["default"] = generateEntities;
