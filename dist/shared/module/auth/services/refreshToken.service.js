"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAuth = void 0;
const http_status_1 = __importDefault(require("http-status"));
const errors_1 = require("../../../errors");
const TokenService = __importStar(require("../../../token/token.service"));
const mongoose_1 = __importDefault(require("mongoose"));
const token_types_1 = __importDefault(require("../../../token/token.types"));
const _1 = require(".");
/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<IUserWithTokens>}
 */
const refreshAuth = async (refreshToken) => {
    try {
        const refreshTokenDoc = await TokenService.verifyToken(refreshToken, token_types_1.default.REFRESH);
        const user = await (0, _1.getUserById)(new mongoose_1.default.Types.ObjectId(refreshTokenDoc.user));
        if (!user) {
            throw new Error();
        }
        await refreshTokenDoc.remove();
        const tokens = await TokenService.generateAuthTokens(user);
        return { user, tokens };
    }
    catch (error) {
        console.log(error);
        throw new errors_1.ApiError(http_status_1.default.UNAUTHORIZED, "Please authenticate");
    }
};
exports.refreshAuth = refreshAuth;
//# sourceMappingURL=refreshToken.service.js.map