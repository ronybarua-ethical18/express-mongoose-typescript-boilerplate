"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
// import ExpressMongoSanitize from "express-mongo-sanitize";
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// import passport from "passport";
const http_status_1 = __importDefault(require("http-status"));
const routes_1 = __importDefault(require("./routes"));
const errors_1 = require("./shared/errors");
const app = (0, express_1.default)();
//set security Http headers
app.use((0, helmet_1.default)());
// enable cors
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
// parse json request body
app.use(express_1.default.json());
// parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: false }));
// logger
app.use((0, morgan_1.default)("dev"));
// sanitize request data to remove unwanted characters from req.body, req.query, req.params ($, . etc ..)
// app.use(ExpressMongoSanitize());
// gzip compression
app.use((0, compression_1.default)());
// v1 api routes
app.use('/api/v1', routes_1.default);
// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
    next(new errors_1.ApiError(http_status_1.default.NOT_FOUND, "Not Found"));
});
// convert error to ApiError, if needed
app.use(errors_1.errorConverter);
// handle error
app.use(errors_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map