import { ICreateRatingDto } from "../types";
import * as RatingService from "./rating.service";
import { Request, Response } from "express";
import { logger } from "../../../../config/logger.config";
import { HttpStatus } from "../../../../enums";
import { IRequest } from "../../../../types/custom";

export const createNewRating = async (req: Request, res: Response) => {
  try {
    const payload = { ...req.body } as ICreateRatingDto;
    const { status, message, data, statusCode } = await RatingService.createRating(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [rating.controller.createNewRating]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const getRatingsForTherapist = async (req: IRequest, res: Response) => {
  try {
    const { status, message, data, statusCode } = await RatingService.getRatings(
      req.body.therapist_id,
    );
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [rating.controller.getRatingsForTherapist]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const getAverageRatingsForTherapist = async (req: IRequest, res: Response) => {
  try {
    const { status, message, data, statusCode } = await RatingService.getAverageRatings(
      req.body.therapist_id,
    );
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [rating.controller.getAverageRatingsForTherapist]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};
