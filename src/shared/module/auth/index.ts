import express, { Router } from "express";
import AuthController from "./controllers/";

const router: Router = express.Router();

// auth routes
router.post("/signup", AuthController.signup);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/login", AuthController.login);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);
router.post("/refresh-token", AuthController.refreshTokens);

export default router;
