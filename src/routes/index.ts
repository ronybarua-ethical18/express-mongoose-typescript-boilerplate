import express, { Router } from "express";
import authRoute from '../shared/module/auth'

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}
const defaultRoutes: IRoute[] = [
  {
    path: "/auth/",
    route: authRoute,
  },
  // {
  //   path: "/customer/",
  //   route: userRoute,
  // },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
