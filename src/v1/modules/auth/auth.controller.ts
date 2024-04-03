import { Request, Response } from "express";
import { HttpStatus } from "../../../enums";
import * as AuthService from "./auth.service";
import { IRefreshTokenDto, ISignInDto, ISignUpDto } from "./types";
import { logger } from "../../../config/logger.config";

export const signUp = async (req: Request, res: Response) => {
  try {
    const payload = { ...req.body } as ISignUpDto;
    const { status, message, data, statusCode } = await AuthService.signUp(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    console.log(error);

    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [auth.controller.signUp]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const payload = { ...req.body } as ISignInDto;
    const { status, message, data, statusCode } = await AuthService.signIn(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const getNewAccessToken = async (req: Request, res: Response) => {
  try {
    const payload = { ...req.body } as IRefreshTokenDto;
    const { status, message, data, statusCode } = await AuthService.generateNewAccessToken(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};
