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
exports.verifyEmail = void 0;
const http_status_1 = __importDefault(require("http-status"));
const errors_1 = require("../../../errors");
const user_model_1 = __importDefault(require("../models/user.model"));
const TokenService = __importStar(require("../../../token/token.service"));
const mongoose_1 = __importDefault(require("mongoose"));
const token_types_1 = __importDefault(require("../../../token/token.types"));
const token_model_1 = __importDefault(require("../../../token/token.model"));
const _1 = require(".");
/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise<IUserDoc | null>}
 */
const verifyEmail = async (verifyEmailToken) => {
    try {
        const verifyEmailTokenDoc = await TokenService.verifyToken(verifyEmailToken, token_types_1.default.VERIFY_EMAIL);
        console.log(verifyEmailToken);
        const user = await (0, _1.getUserById)(new mongoose_1.default.Types.ObjectId(verifyEmailTokenDoc.user));
        if (!user) {
            throw new errors_1.ApiError(http_status_1.default.NOT_FOUND, "User not found");
        }
        await token_model_1.default.deleteMany({
            user: user.id,
            type: token_types_1.default.VERIFY_EMAIL,
        });
        const updatedUser = await user_model_1.default.findByIdAndUpdate(user.id, {
            isVerified: true,
        });
        return updatedUser;
    }
    catch (error) {
        console.log(error);
        throw new errors_1.ApiError(http_status_1.default.UNAUTHORIZED, "Email verification failed");
    }
};
exports.verifyEmail = verifyEmail;
//# sourceMappingURL=verifyEmail.service.js.map