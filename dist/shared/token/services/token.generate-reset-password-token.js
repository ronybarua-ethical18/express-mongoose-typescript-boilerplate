"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResetPasswordToken = void 0;
const moment_1 = __importDefault(require("moment"));
const config_1 = __importDefault(require("src/config/config"));
const errors_1 = require("src/shared/errors");
const token_service_1 = require("../token.service");
const token_types_1 = __importDefault(require("../token.types"));
const user_model_1 = __importDefault(require("../../module/auth/models/user.model"));
const http_status_1 = __importDefault(require("http-status"));
const generateResetPasswordToken = async (email) => {
    const user = await user_model_1.default.findOne({ email: email });
    if (!user) {
        throw new errors_1.ApiError(http_status_1.default.NOT_FOUND, "No users found with this email");
    }
    const expires = (0, moment_1.default)().add(config_1.default.jwt.resetPasswordExpirationMinutes, "minutes");
    const resetPasswordToken = (0, token_service_1.generateToken)(user.id, expires, token_types_1.default.RESET_PASSWORD);
    await (0, token_service_1.saveToken)(resetPasswordToken, user.id, expires, token_types_1.default.RESET_PASSWORD);
    return resetPasswordToken;
};
exports.generateResetPasswordToken = generateResetPasswordToken;
//# sourceMappingURL=token.generate-reset-password-token.js.map