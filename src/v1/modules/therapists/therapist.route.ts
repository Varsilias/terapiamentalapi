import { Router } from "express";
import { authCheck, validateRequest } from "../auth/middlewares";
import { REQUEST_FIELD } from "../../../enums";
import * as TherapistController from "./therapist.controller";
import * as schema from "./schema-validator";

export const therapistRouter = Router();

therapistRouter.post(
  "/",
  authCheck,
  validateRequest(REQUEST_FIELD.BODY, schema.CreateTherapistSchema),
  TherapistController.createNewTherapist,
);

therapistRouter.get("/", authCheck, TherapistController.getAllTherapists);

therapistRouter.get(
  "/:therapistId",
  authCheck,
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetATherapist),
  TherapistController.getATherapist,
);

therapistRouter.patch(
  "/:therapistId",
  authCheck,
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetATherapist),
  validateRequest(REQUEST_FIELD.BODY, schema.UpdateTherapistSchema),
  TherapistController.updateATherapist,
);

therapistRouter.delete(
  "/:therapistId",
  authCheck,
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetATherapist),
  TherapistController.deleteATherapist,
);
