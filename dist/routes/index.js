"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../shared/module/auth"));
const router = express_1.default.Router();
const defaultRoutes = [
    {
        path: "/auth/",
        route: auth_1.default,
    },
    // {
    //   path: "/customer/",
    //   route: userRoute,
    // },
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
//# sourceMappingURL=index.js.map