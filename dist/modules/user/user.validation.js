"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const joi_1 = __importDefault(require("joi"));
const createUserBody = {
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    role: joi_1.default.string().required().valid('user', 'admin'),
};
exports.createUser = {
    body: joi_1.default.object().keys(createUserBody),
};
//# sourceMappingURL=user.validation.js.map