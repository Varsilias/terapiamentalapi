import { Response } from "express";
import { IRequest } from "../../../types/custom";
import { HttpStatus } from "../../../enums";
import * as StoreService from "./store.service";
import {
  ICreateStoreDto,
  IDeleteAStore,
  IGetAStoreDto,
  IGetAllStoresDto,
  IUpdateAStore,
} from "./types";
import { logger } from "../../../config/logger.config";

export const createNewStore = async (req: IRequest, res: Response) => {
  try {
    const payload = { ...req.body, userId: req.user._id } as ICreateStoreDto;
    console.log("payload", payload);

    const { status, message, data, statusCode } = await StoreService.createStore(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [store.controller.createNewStore]: ${error?.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const getAllStores = async (req: IRequest, res: Response) => {
  try {
    const payload = { ...req.query, userId: req.user._id } as IGetAllStoresDto;

    const { status, message, data, statusCode } = await StoreService.getStores(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [store.controller.getAllStores]: ${error?.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const getAStore = async (req: IRequest, res: Response) => {
  try {
    const payload = { ...req.params, userId: req.user._id } as IGetAStoreDto;

    const { status, message, data, statusCode } = await StoreService.getStore(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [store.controller.getAStore]: ${error?.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const updateAStore = async (req: IRequest, res: Response) => {
  try {
    const payload = { ...req.params, ...req.body, userId: req.user._id } as IUpdateAStore;

    const { status, message, data, statusCode } = await StoreService.updateStore(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [store.controller.updateAStore]: ${error?.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const deleteAStore = async (req: IRequest, res: Response) => {
  try {
    const payload = { ...req.params, userId: req.user._id } as IDeleteAStore;

    const { status, message, data, statusCode } = await StoreService.deleteStore(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [store.controller.deleteAStore]: ${error?.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};
