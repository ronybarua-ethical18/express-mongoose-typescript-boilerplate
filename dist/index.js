"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
const errors_1 = require("./modules/errors");
let server;
//server connect
mongoose_1.default.connect(config_1.default.mongoose.url).then(() => {
    console.log("<===== Database Connected Successfully =====>");
    server = app_1.default.listen(config_1.default.port, () => {
        console.log(`Listening to port ${config_1.default.port}`);
    });
});
const serverExitHandler = () => {
    if (server) {
        server.close(() => {
            console.log("server closed");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    throw new errors_1.ApiError(500, error);
    serverExitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
    console.log("SIGTERM received");
    if (server) {
        server.close();
    }
});
//# sourceMappingURL=index.js.map