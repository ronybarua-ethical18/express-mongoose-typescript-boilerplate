import express, { Router } from "express";
import { login } from "./controllers/user.login";
import { setPassword } from "./controllers/user.set_password";
import { signup } from "./controllers/user.signup";
// import { signup } from "./services/user.service";

const router: Router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/set-password", setPassword);
// router.post("login", signup);

export default router;

