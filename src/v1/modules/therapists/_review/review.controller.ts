import { IRequest } from "../../../../types/custom";
import { HttpStatus } from "../../../../enums/http-status";
import { logger } from "../../../../config/logger.config";
import { ICreateReviewDto } from "../types";
import * as ReviewService from "./review.service";
import { Response } from "express";

export const createNewReview = async (req: IRequest, res: Response) => {
  try {
    const payload = {
      ...req.body,
      user_id: req.user.id,
    } as ICreateReviewDto;

    const { status, message, data, statusCode } = await ReviewService.createNewReview(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [review.controller.createNewReview]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const getReviewsForTherapist = async (req: IRequest, res: Response) => {
  try {
    const { status, message, data, statusCode } = await ReviewService.getReviews(
      req.body.therapist_id,
    );
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [review.controller.getReviewsForTherapist]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};
