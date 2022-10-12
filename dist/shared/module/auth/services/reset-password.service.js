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
exports.resetPassword = void 0;
const http_status_1 = __importDefault(require("http-status"));
const errors_1 = require("../../../errors");
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const TokenService = __importStar(require("../../../token/token.service"));
const mongoose_1 = __importDefault(require("mongoose"));
const token_types_1 = __importDefault(require("../../../token/token.types"));
const token_model_1 = __importDefault(require("../../../token/token.model"));
const _1 = require(".");
/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
    try {
        const resetPasswordTokenDoc = await TokenService.verifyToken(resetPasswordToken, token_types_1.default.RESET_PASSWORD);
        const user = await (0, _1.getUserById)(new mongoose_1.default.Types.ObjectId(resetPasswordTokenDoc.user));
        if (!user) {
            throw new Error();
        }
        const hash = await bcryptjs_1.default.hash(newPassword, 10);
        await user_model_1.default.findByIdAndUpdate(user.id, {
            password: hash,
        });
        await token_model_1.default.deleteMany({
            user: user.id,
            type: token_types_1.default.RESET_PASSWORD,
        });
    }
    catch (error) {
        console.log(error);
        throw new errors_1.ApiError(http_status_1.default.UNAUTHORIZED, "Password reset failed");
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=reset-password.service.js.map