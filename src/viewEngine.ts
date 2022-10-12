const path = require("path");

const handlebarOptions:any = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.join(__dirname, "templates"),
    defaultLayout: false,
  },
  viewPath: path.join(__dirname, "templates"),
  extName: ".handlebars",
};

export default handlebarOptions