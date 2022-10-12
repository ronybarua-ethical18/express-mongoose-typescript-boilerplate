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
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../../utils/catchAsync"));
const services_1 = __importDefault(require("../services/"));
const TokenService = __importStar(require("../../../token/token.service"));
const signup = (0, catchAsync_1.default)(async (req, res) => {
    const user = await services_1.default.signup(req.body);
    res.status(http_status_1.default.CREATED).send({ user: user, status: true });
});
const verifyEmail = (0, catchAsync_1.default)(async (req, res) => {
    await services_1.default.verifyEmail(req.query["token"]);
    res.status(http_status_1.default.CREATED).send({
        status: true,
        message: "Your email verification is successfully done",
    });
});
const login = (0, catchAsync_1.default)(async (req, res) => {
    const user = await services_1.default.login(req.body);
    const tokens = await TokenService.generateAuthTokens(user);
    res.status(http_status_1.default.CREATED).send({ user: user, status: true, tokens });
});
const forgotPassword = (0, catchAsync_1.default)(async (req, res) => {
    const resetPasswordToken = await TokenService.generateResetPasswordToken(req.body.email);
    res.status(http_status_1.default.CREATED).send(resetPasswordToken);
});
const resetPassword = (0, catchAsync_1.default)(async (req, res) => {
    await services_1.default.resetPassword(req.query["token"], req.body.password);
    res
        .status(http_status_1.default.CREATED)
        .send({ status: true, message: "Your password has set successfully" });
});
const refreshTokens = (0, catchAsync_1.default)(async (req, res) => {
    const userWithTokens = await services_1.default.refreshAuth(req.body.refreshToken);
    res.send(Object.assign({}, userWithTokens));
});
exports.default = {
    signup,
    login,
    verifyEmail,
    forgotPassword,
    resetPassword,
    refreshTokens,
};
//# sourceMappingURL=index.js.map