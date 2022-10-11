"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const errors_1 = require("../errors");
const user_model_1 = __importDefault(require("./user.model"));
/**
 * @param {NewCreatedUser} userBody
 * @returns {Promise<IUserInfo>}
 */
const createUser = async (userBody) => {
    if (await user_model_1.default.isEmailTaken(userBody.email)) {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, 'Email already taken');
    }
    return user_model_1.default.create(userBody);
};
exports.createUser = createUser;
//# sourceMappingURL=user.service.js.map