import mongoose from "mongoose";
import app from "./app";
import config from "./config/config";
import { ApiError } from "./modules/errors";

let server: any;

//server connect
mongoose.connect(config.mongoose.url).then(() => {
  console.log("<===== Database Connected Successfully =====>");
  server = app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
  });
});

const serverExitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  throw new ApiError(500, error);
  serverExitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});
