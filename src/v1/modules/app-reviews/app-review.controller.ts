import { Response } from "express";
import { IRequest } from "../../../types/custom";
import { logger } from "../../../config/logger.config";
import { HttpStatus } from "../../../enums";
import * as AppReviewService from "./app-review.service";
import { IAppReviewDto, IGetAllAppReviewsDto } from "./types";

export const createNewAppReview = async (req: IRequest, res: Response) => {
  try {
    const payload = {
      ...req.body,
      user_id: req.user.id,
    } as IAppReviewDto;

    const { status, message, data, statusCode } =
      await AppReviewService.createNewAppReview(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [app-review.controller.createNewAppReview]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const getAppReviews = async (req: IRequest, res: Response) => {
  try {
    const payload = { ...req.query } as unknown as IGetAllAppReviewsDto;

    const { status, message, data, statusCode } = await AppReviewService.getAppReviews(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [app-review.controller.getAppReviews]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};
