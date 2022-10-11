"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPassword = exports.login = exports.signup = void 0;
const http_status_1 = __importDefault(require("http-status"));
const errors_1 = require("../../../errors");
const user_model_1 = __importDefault(require("../models/user.model"));
const sentMail_1 = __importDefault(require("../../../services/mail/sentMail"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
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
    const secret = process.env["JWT_SECRET"];
    const token = jsonwebtoken_1.default.sign({
        id: user._id,
        name: user.name,
        role: user.role,
    }, secret);
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
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<IUserDoc>}
 */
const login = async (userCredentials) => {
    const user = await user_model_1.default.findOne({ email: userCredentials.email });
    if (!user || !(await user.isPasswordMatch(userCredentials.password))) {
        throw new errors_1.ApiError(http_status_1.default.UNAUTHORIZED, "Incorrect email or password");
    }
    return user;
};
exports.login = login;
// set password when user forgot the password
const setPassword = async (setPasswordInfo) => {
    const secret = process.env["JWT_SECRET"];
    const { id } = jsonwebtoken_1.default.verify(setPasswordInfo.token, secret);
    const hash = await bcryptjs_1.default.hash(setPasswordInfo.password, 10);
    await user_model_1.default.findByIdAndUpdate(id, {
        password: hash,
    });
    return "Your new password has set succesfully";
};
exports.setPassword = setPassword;
//# sourceMappingURL=user.service.js.map