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
exports.refreshAuth = exports.resetPassword = exports.getUserById = exports.login = exports.verifyEmail = exports.signup = void 0;
const http_status_1 = __importDefault(require("http-status"));
const errors_1 = require("../../../errors");
const user_model_1 = __importDefault(require("../models/user.model"));
const sentMail_1 = __importDefault(require("../../../services/mail/sentMail"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const TokenService = __importStar(require("../../../token/token.service"));
const mongoose_1 = __importDefault(require("mongoose"));
const token_types_1 = __importDefault(require("../../../token/token.types"));
const token_model_1 = __importDefault(require("../../../token/token.model"));
/**
 * @param {NewCreatedUser} userBody
 * @returns {Promise<IUserInfo>}
 */
const signup = async (userBody) => {
    const isUniqueEmail = await user_model_1.default.isEmailTaken(userBody.email);
    //checking the email is already exist or not
    if (isUniqueEmail) {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, "Email already taken");
    }
    const user = await user_model_1.default.create(userBody);
    const token = await TokenService.generateVerifyEmailToken(user);
    (0, sentMail_1.default)([user.email], {
        subject: "Verify Email",
        data: {
            name: user.name,
            role: user.role,
            ttoken: process.env["CLIENT_PORT"] + "/set-password" + token,
        },
    }, "account_creation_email");
    return user;
};
exports.signup = signup;
/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise<IUserDoc | null>}
 */
const verifyEmail = async (verifyEmailToken) => {
    try {
        const verifyEmailTokenDoc = await TokenService.verifyToken(verifyEmailToken, token_types_1.default.VERIFY_EMAIL);
        console.log(verifyEmailToken);
        const user = await (0, exports.getUserById)(new mongoose_1.default.Types.ObjectId(verifyEmailTokenDoc.user));
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
/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<IUserInfo>}
 */
const login = async (userCredentials) => {
    const user = await user_model_1.default.findOne({ email: userCredentials.email });
    if (!user || !(await user.isPasswordMatch(userCredentials.password))) {
        throw new errors_1.ApiError(http_status_1.default.UNAUTHORIZED, "Incorrect email or password");
    }
    return user;
};
exports.login = login;
/**
 * Get user by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserInfo | null>}
 */
const getUserById = async (id) => user_model_1.default.findById(id);
exports.getUserById = getUserById;
/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
    try {
        const resetPasswordTokenDoc = await TokenService.verifyToken(resetPasswordToken, token_types_1.default.RESET_PASSWORD);
        const user = await (0, exports.getUserById)(new mongoose_1.default.Types.ObjectId(resetPasswordTokenDoc.user));
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
/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<IUserWithTokens>}
 */
const refreshAuth = async (refreshToken) => {
    try {
        const refreshTokenDoc = await TokenService.verifyToken(refreshToken, token_types_1.default.REFRESH);
        const user = await (0, exports.getUserById)(new mongoose_1.default.Types.ObjectId(refreshTokenDoc.user));
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
//# sourceMappingURL=auth.service.js.map