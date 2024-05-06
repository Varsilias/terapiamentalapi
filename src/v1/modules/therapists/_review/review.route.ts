import { Router } from "express";
import { authCheck, validateRequest } from "../../auth/middlewares";
import { REQUEST_FIELD } from "../../../../enums";
import * as ReviewController from "./review.controller";
import * as schema from "../schema-validator";

export const reviewRouter = Router();

reviewRouter.post(
  "/",
  authCheck,
  validateRequest(REQUEST_FIELD.BODY, schema.CreateReviewSchema),
  ReviewController.createNewReview,
);

reviewRouter.get(
  "/",
  authCheck,
  validateRequest(REQUEST_FIELD.BODY, schema.GetReviewSchema),
  ReviewController.getReviewsForTherapist,
);
