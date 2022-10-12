"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const signup_service_1 = require("./signup.service");
const login_service_1 = require("./login.service");
const reset_password_service_1 = require("./reset-password.service");
const verifyEmail_service_1 = require("./verifyEmail.service");
const refreshToken_service_1 = require("./refreshToken.service");
/**
 * Get user by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserInfo | null>}
 */
const getUserById = async (id) => user_model_1.default.findById(id);
exports.getUserById = getUserById;
exports.default = {
    signup: signup_service_1.signup,
    login: login_service_1.login,
    resetPassword: reset_password_service_1.resetPassword,
    verifyEmail: verifyEmail_service_1.verifyEmail,
    refreshAuth: refreshToken_service_1.refreshAuth,
};
//# sourceMappingURL=index.js.map