import { Request, Response } from "express";
import { logger } from "../../../../config/logger.config";
import { HttpStatus } from "../../../../enums";
import { ICreateCategoryDto, IGetAllCatgeoriesDto } from "../types";
import * as CategoryService from "./category.service";

export const createNewCategory = async (req: Request, res: Response) => {
  try {
    const payload = { ...req.body } as ICreateCategoryDto;

    const { status, message, data, statusCode } = await CategoryService.createCategory(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [category.controller.createNewCategory]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const payload = { ...req.query } as unknown as IGetAllCatgeoriesDto;

    const { status, message, data, statusCode } = await CategoryService.getCatgeories(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [category.controller.getAllCategories]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};
