"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const viewEngine_1 = __importDefault(require("./viewEngine"));
// mail sender
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "099197e15c3b52",
        pass: "d2fec6d29cec5b",
    },
    tls: {
        rejectUnauthorized: false,
    },
});
exports.transporter.use("compile", (0, nodemailer_express_handlebars_1.default)(viewEngine_1.default));
//# sourceMappingURL=mailConfig.js.map