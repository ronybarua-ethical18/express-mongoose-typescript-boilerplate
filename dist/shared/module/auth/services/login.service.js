"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const http_status_1 = __importDefault(require("http-status"));
const errors_1 = require("../../../errors");
const user_model_1 = __importDefault(require("../models/user.model"));
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
//# sourceMappingURL=login.service.js.map