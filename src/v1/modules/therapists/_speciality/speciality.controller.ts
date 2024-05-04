import { Request, Response } from "express";
import { logger } from "../../../../config/logger.config";
import { HttpStatus } from "../../../../enums";
import { ICreateCategoryDto, IGetAllCatgeoriesDto } from "../types";
import * as SpecialityService from "./speciality.service";

export const createSpeciality = async (req: Request, res: Response) => {
  try {
    const payload = { ...req.body } as ICreateCategoryDto;

    const { status, message, data, statusCode } = await SpecialityService.createSpeciality(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [category.controller.createSpeciality]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const getAllSpecialities = async (req: Request, res: Response) => {
  try {
    const payload = { ...req.query } as unknown as IGetAllCatgeoriesDto;

    const { status, message, data, statusCode } = await SpecialityService.getSpecialities(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [category.controller.getAllSpecialities]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};
