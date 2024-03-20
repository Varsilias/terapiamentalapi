import express, { Request, Response, NextFunction } from "express";
import { EnvConfig } from "./config/env.config";
import { HttpStatus } from "./enums";
import { logger } from "./config/logger.config";
import { AppException } from "./exceptions";

const app = express();

new EnvConfig();

app.get("/", (req, res) => {
  throw new AppException("src.app", "Unable to process request", {
    error: "FIELD_VALIDATION",
    data: {},
  });
  res.send("Hello World");
});

app.use(async (error: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(
    `[MainstackException] - [ExceptionHandler] --> [Location]: "${error.errorCode}" ---- ${error.customMessage}`,
  );
  res.status(error.statusCode).json({
    status: false,
    message: error.customMessage,
    details: {
      type: error.errorCode,
      detail: error.data,
    },
  });
});

app.get("*", function (_, res) {
  res
    .status(HttpStatus.NOT_FOUND)
    .json({ message: "Resource not found, check the url and try again" });
});

export default app;
