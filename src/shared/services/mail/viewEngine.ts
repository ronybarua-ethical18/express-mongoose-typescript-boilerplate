const path = require("path");

const handlebarOptions:any = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve(__dirname, "templates"),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, "templates"),
  extName: ".handlebars",
};

export default handlebarOptions