import { Router } from "express";
import { authCheck, validateRequest } from "../../auth/middlewares";
import { REQUEST_FIELD } from "../../../../enums";
import * as RatingController from "./rating.controller";
import * as schema from "../schema-validator";

export const ratingRouter = Router();

ratingRouter.post(
  "/",
  authCheck,
  validateRequest(REQUEST_FIELD.BODY, schema.CreateRatingSchema),
  RatingController.createNewRating,
);

ratingRouter.get(
  "/",
  authCheck,
  validateRequest(REQUEST_FIELD.BODY, schema.GetRatingSchema),
  RatingController.getRatingsForTherapist,
);

ratingRouter.get(
  "/average",
  authCheck,
  validateRequest(REQUEST_FIELD.BODY, schema.GetRatingSchema),
  RatingController.getAverageRatingsForTherapist,
);
