"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthTokens = void 0;
const moment_1 = __importDefault(require("moment"));
const token_service_1 = require("../token.service");
const token_types_1 = __importDefault(require("../token.types"));
const config_1 = __importDefault(require("src/config/config"));
/**
 * Generate auth tokens
 * @param {IUserDoc} user
 * @returns {Promise<AccessAndRefreshTokens>}
 */
const generateAuthTokens = async (user) => {
    const accessTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.accessExpirationMinutes, "minutes");
    const accessToken = (0, token_service_1.generateToken)(user.id, accessTokenExpires, token_types_1.default.ACCESS);
    const refreshTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.refreshExpirationDays, "days");
    const refreshToken = (0, token_service_1.generateToken)(user.id, refreshTokenExpires, token_types_1.default.REFRESH);
    await (0, token_service_1.saveToken)(refreshToken, user.id, refreshTokenExpires, token_types_1.default.REFRESH);
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};
exports.generateAuthTokens = generateAuthTokens;
//# sourceMappingURL=token.auth-token.js.map