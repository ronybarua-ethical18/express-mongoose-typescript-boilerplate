import express, { Router } from "express";
import { userController } from ".";

const router: Router = express.Router();

router.post("create-user", userController.createUser);

export default router;
