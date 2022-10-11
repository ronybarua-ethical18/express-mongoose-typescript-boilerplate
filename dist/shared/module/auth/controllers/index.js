"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_signup_1 = require("./user.signup");
const router = express_1.default.Router();
router.post("signup", user_signup_1.signup);
// router.post("login", signup);
exports.default = router;
//# sourceMappingURL=index.js.map