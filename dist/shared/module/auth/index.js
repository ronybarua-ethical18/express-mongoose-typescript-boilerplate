"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_login_1 = require("./controllers/user.login");
const user_set_password_1 = require("./controllers/user.set_password");
const user_signup_1 = require("./controllers/user.signup");
// import { signup } from "./services/user.service";
const router = express_1.default.Router();
router.post("/signup", user_signup_1.signup);
router.post("/login", user_login_1.login);
router.post("/set-password", user_set_password_1.setPassword);
// router.post("login", signup);
exports.default = router;
//# sourceMappingURL=index.js.map