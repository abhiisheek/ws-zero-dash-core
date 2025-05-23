import "dotenv/config";

import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import compression from "compression";
import xss from "xss-clean";
import sanitizer from "express-html-sanitizer";
// import swaggerUI from "swagger-ui-express";

// import swaggerFile from "../swagger_output.json" with { type: "json" };


import rateLimiter from "./middleware/rateLimiter.js";
import logger from "./utils/logger.js";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/user.js";
import projectsRouter from "./routes/project.js";
import dbRouter from "./routes/db.js";
import llmRouter from "./routes/llm.js";

const { json, urlencoded } = bodyParser;

const sanitizeConfig = {
  allowedTags: ["b", "i", "em", "strong", "a", "p"],
  allowedAttributes: { a: ["href"] },
};

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(sanitizer(sanitizeConfig));
app.use(rateLimiter);
app.use(xss());
app.use(compression());
app.options("*", cors());
app.disable("x-powered-by");

// log all requests
app.use((req, res, next) => {
  const log = {
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
  };

  if (res.statusCode > 299) {
    logger.error(log);
  } else {
    logger.info(log);
  }
  next();
});

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/project", projectsRouter);
app.use("/db", dbRouter);
app.use("/llm", llmRouter);

var options = {
  explorer: true
};

// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile, options));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
