import { Router } from "express";
import { validateRequest } from "../../auth/middlewares";
import { REQUEST_FIELD } from "../../../../enums";
import * as SpecialityController from "./speciality.controller";
import * as schema from "../schema-validator";
import { PaginationSchema } from "../../onboarding/schema-validator";

export const specialityRouter = Router();

specialityRouter.post(
  "/",
  validateRequest(REQUEST_FIELD.BODY, schema.CreateCategorySchema),
  SpecialityController.createSpeciality,
);

specialityRouter.get(
  "/",
  validateRequest(REQUEST_FIELD.QUERY, PaginationSchema),
  SpecialityController.getAllSpecialities,
);
