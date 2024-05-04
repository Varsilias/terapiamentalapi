import { logger } from "../../../config/logger.config";
import { HttpStatus } from "../../../enums";
import * as TherapistService from "./therapist.service";
import { Request, Response } from "express";
import { ICreateTherapistDto, IUpdateTherapistDto } from "./types";

export const getAllTherapists = async (req: Request, res: Response) => {
  try {
    const { status, message, data, statusCode } = await TherapistService.getTherapists();
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [therapist.controller.getAllTherapists]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const getATherapist = async (req: Request, res: Response) => {
  try {
    const { therapistId } = req.params;

    const { status, message, data, statusCode } = await TherapistService.getTherapist(therapistId);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [therapist.controller.getATherapist]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const createNewTherapist = async (req: Request, res: Response) => {
  try {
    const payload = { ...req.body } as ICreateTherapistDto;
    const { status, message, data, statusCode } = await TherapistService.createTherapist(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [therapist.controller.createNewTherapist]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const updateATherapist = async (req: Request, res: Response) => {
  try {
    const payload = { ...req.body, id: req.params.therapistId } as IUpdateTherapistDto;

    const { status, message, data, statusCode } = await TherapistService.updateTherapist(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [therapist.controller.updateATherapist]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const deleteATherapist = async (req: Request, res: Response) => {
  try {
    const { status, message, data, statusCode } = await TherapistService.deleteTherapist(
      req.params.therapistId,
    );
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [therapist.controller.deleteATherapist]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};
