"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const handlebarOptions = {
    viewEngine: {
        extName: ".handlebars",
        partialsDir: path.join(__dirname, "templates"),
        defaultLayout: false,
    },
    viewPath: path.join(__dirname, "templates"),
    extName: ".handlebars",
};
exports.default = handlebarOptions;
//# sourceMappingURL=viewEngine.js.map