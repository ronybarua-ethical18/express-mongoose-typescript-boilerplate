"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = __importDefault(require("./controllers/"));
const router = express_1.default.Router();
// auth routes
router.post("/signup", controllers_1.default.signup);
router.post("/verify-email", controllers_1.default.verifyEmail);
router.post("/login", controllers_1.default.login);
router.post("/forgot-password", controllers_1.default.forgotPassword);
router.post("/reset-password", controllers_1.default.resetPassword);
router.post("/refresh-token", controllers_1.default.refreshTokens);
exports.default = router;
//# sourceMappingURL=index.js.map