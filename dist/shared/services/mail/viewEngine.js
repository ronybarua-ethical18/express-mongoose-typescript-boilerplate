"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const handlebarOptions = {
    viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve(__dirname, "templates"),
        defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "templates"),
    extName: ".handlebars",
};
exports.default = handlebarOptions;
//# sourceMappingURL=viewEngine.js.map