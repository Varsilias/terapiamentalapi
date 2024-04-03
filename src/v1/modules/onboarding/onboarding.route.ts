import { Router } from "express";
import { authCheck, validateRequest } from "../auth/middlewares";
import * as OnboardingController from "./onboarding.controller";
import { REQUEST_FIELD } from "../../../enums";
import * as schema from "./schema-validator";

export const onboardingRouter = Router();

onboardingRouter.get(
  "/step",
  authCheck,
  validateRequest(REQUEST_FIELD.QUERY, schema.GetAllStepsSchema),
  OnboardingController.getOnboardingSteps,
);

onboardingRouter.post(
  "/step",
  authCheck,
  validateRequest(REQUEST_FIELD.BODY, schema.CreateStepOptionsSchema),
  OnboardingController.createOnboardingStep,
);

onboardingRouter.patch(
  "/step/:stepId/option",
  authCheck,
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetStepchema),
  validateRequest(REQUEST_FIELD.BODY, schema.UpdateStepOptionsSchema),
  OnboardingController.updateOnboardingStep,
);

onboardingRouter.delete(
  "/step/:stepId/option/:optionId",
  authCheck,
  validateRequest(REQUEST_FIELD.PARAMS, schema.DeleteStepOptionSchema),
  OnboardingController.deleteOnboardingStepOption,
);

onboardingRouter.post(
  "/",
  authCheck,
  validateRequest(REQUEST_FIELD.BODY, schema.OnboardingSelectionSchema),
  OnboardingController.onBoard,
);
