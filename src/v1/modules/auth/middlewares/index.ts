import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../../enums";
import { z } from "zod";
import { logger } from "../../../../config/logger.config";
import * as JWTService from "../jwt.service";
import { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import * as AuthService from "../auth.service";
import { IRequest } from "../../../../types/custom";

export const validateRequest =
  (section: string, validateSchema: z.ZodObject<Record<string, any>>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestSection = section.toLowerCase();
      const payload = req[requestSection as keyof Request];

      const schema = validateSchema.safeParse(payload);

      if (!schema.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          message: `${schema.error.issues[0].message}`,
          detail: `${section.toUpperCase()}_FIELD_VALIDATION_ERROR`,
        });
      }

      switch (requestSection) {
        case "query":
          req.query = schema.data;
          break;

        case "body":
          req.query = schema.data;
          break;

        default:
          req.params = schema.data;
          break;
      }

      // console.log(schema.data);

      next();
    } catch (error: any) {
      logger.error(
        `[MainstackException] - [ExceptionHandler] - [auth.middleware.validateRequest]: ${error.message}`,
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: "An error occured, we are fixing it",
        detail: "",
      });
    }
  };

export const authCheck = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({
        status: false,
        message: "Unauthorised",
      });
    }

    const token = authHeader.split(" ")[1];

    const payload = JWTService.verifyAccessToken(token) as JwtPayload;
    const user = await AuthService.findUserById(payload._id);

    req.user = user;

    next();
  } catch (error: any) {
    logger.error(
      `[MainstackException] - [ExceptionHandler] - [auth.middleware.authCheck]: ${error.message}`,
    );
    // TODO: reissue a new access token provided the refresh token is present
    if (error instanceof TokenExpiredError) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ status: false, message: "Token Expired", detail: error?.message });
    }
    if (error instanceof JsonWebTokenError) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: false,
        message: "Invalid or malfunctioned jwt token",
        detail: error?.message,
      });
    }
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "could not resolve request" });
  }
};
