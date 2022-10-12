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
exports.signup = void 0;
const http_status_1 = __importDefault(require("http-status"));
const errors_1 = require("../../../errors");
const user_model_1 = __importDefault(require("../models/user.model"));
const sentMail_1 = __importDefault(require("../../../services/mail/sentMail"));
const TokenService = __importStar(require("../../../token/token.service"));
const constants_1 = require("../../../services/mail/constants");
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
            token: process.env["CLIENT_PORT"] + "/set-password" + token,
        },
    }, constants_1.VERIFY_EMAIL_TEMPLATE);
    return user;
};
exports.signup = signup;
//# sourceMappingURL=signup.service.js.map