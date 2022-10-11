import express, { Express } from "express";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
const logger = require("morgan");
// import passport from "passport";
import httpStatus from "http-status";
import routes from './routes'
import { ApiError, errorConverter, errorHandler } from "./modules/errors";

const app: Express = express();

//set security Http headers
app.use(helmet());

// enable cors
app.use(cors());
app.options("*", cors());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// logger
app.use(logger("dev"));

// sanitize request data to remove unwanted characters from req.body, req.query, req.params ($, . etc ..)
app.use(ExpressMongoSanitize());

// gzip compression
app.use(compression());

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not Found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
