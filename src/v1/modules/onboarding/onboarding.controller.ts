import { logger } from "../../../config/logger.config";
import { HttpStatus } from "../../../enums";
import { Response } from "express";
import * as OnboardingService from "./onboarding.service";
import {
  ICreateStepOptionsDto,
  IDeleteStepOptionDto,
  IGetAllStepsDto,
  IOnBoardDto,
  IUpdateStepOptionsDto,
} from "./types";
import { IRequest } from "../../../types/custom";

export const getOnboardingSteps = async (req: IRequest, res: Response) => {
  try {
    const payload = { ...req.query } as unknown as IGetAllStepsDto;

    const { status, message, data, statusCode } =
      await OnboardingService.getOnboardingSteps(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [onboarding.controller.getOnboardingSteps]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const createOnboardingStep = async (req: IRequest, res: Response) => {
  try {
    const payload = { ...req.body } as ICreateStepOptionsDto;

    const { status, message, data, statusCode } =
      await OnboardingService.createOnboardingStep(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [onboarding.controller.createOnboardingStep]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};
export const updateOnboardingStep = async (req: IRequest, res: Response) => {
  try {
    const payload = { ...req.body, step_id: req.params.stepId } as IUpdateStepOptionsDto;

    const { status, message, data, statusCode } =
      await OnboardingService.updateOnboardingStep(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [onboarding.controller.updateOnboardingStep]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const deleteOnboardingStepOption = async (req: IRequest, res: Response) => {
  try {
    const payload = {
      option_id: req.params.optionId,
      step_id: req.params.stepId,
    } as unknown as IDeleteStepOptionDto;

    const { status, message, data, statusCode } =
      await OnboardingService.deleteOnboardingStepOption(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [onboarding.controller.deleteOnboardingStepOption]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const onBoard = async (req: IRequest, res: Response) => {
  try {
    const payload = {
      ...req.body,
      user_id: req.user.id,
    } as IOnBoardDto;

    const { status, message, data, statusCode } = await OnboardingService.onBoard(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [onboarding.controller.onBoard]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};
