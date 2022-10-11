import express, { Router } from "express";
import userRoute from "../modules/user/user.route";

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}
const defaultRoutes: IRoute[] = [
  {
    path: "/auth/",
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
