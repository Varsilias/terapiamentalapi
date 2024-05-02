import { Router } from "express";
import { authCheck, validateRequest } from "../auth/middlewares";
import { REQUEST_FIELD } from "../../../enums/";
import * as schema from "./schema-validator";
import * as AppReviewController from "./app-review.controller";
import { PaginationSchema } from "../onboarding/schema-validator";

export const appReviewRouter = Router();

appReviewRouter.post(
  "/",
  authCheck,
  validateRequest(REQUEST_FIELD.BODY, schema.CreateAppReviewSchema),
  AppReviewController.createNewAppReview,
);

appReviewRouter.get(
  "/",
  authCheck,
  validateRequest(REQUEST_FIELD.QUERY, PaginationSchema),
  AppReviewController.getAppReviews,
);
