import { Response } from "express";
import { IRequest } from "../../../../types/custom";
import { HttpStatus } from "../../../../enums";
import * as ProductService from "./product.service";
import {
  ICreateProductDto,
  IDeleteAProduct,
  IGetAProductDto,
  IGetAllProductsDto,
  IUpdateAProduct,
} from "../types";
import { logger } from "../../../../config/logger.config";

export const createNewProduct = async (req: IRequest, res: Response) => {
  try {
    const payload = {
      ...req.body,
      userId: req.user._id,
      storeId: req.params.storeId,
    } as ICreateProductDto;

    const { status, message, data, statusCode } = await ProductService.createProduct(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[MainstackException] - [ExceptionHandler] - [store.controller.createNewProduct]: ${error?.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const getAllProducts = async (req: IRequest, res: Response) => {
  try {
    const payload = {
      ...req.query,
      storeId: req.params.storeId,
      userId: req.user._id,
    } as IGetAllProductsDto;

    const { status, message, data, statusCode } = await ProductService.getProducts(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[MainstackException] - [ExceptionHandler] - [store.controller.getAllProducts]: ${error?.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const getAProduct = async (req: IRequest, res: Response) => {
  try {
    const payload = {
      ...req.params,
      userId: req.user._id,
    } as IGetAProductDto;

    const { status, message, data, statusCode } = await ProductService.getProduct(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[MainstackException] - [ExceptionHandler] - [store.controller.getAProduct]: ${error?.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const updateAProduct = async (req: IRequest, res: Response) => {
  try {
    const payload = { ...req.params, ...req.body, userId: req.user._id } as IUpdateAProduct;

    const { status, message, data, statusCode } = await ProductService.updateProduct(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[MainstackException] - [ExceptionHandler] - [store.controller.updateAProduct]: ${error?.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const deleteAProduct = async (req: IRequest, res: Response) => {
  try {
    const payload = {
      productId: req.params.productId,
      storeId: req.params.storeId,
      userId: req.user._id,
    } as IDeleteAProduct;
    console.log("payload", payload);

    const { status, message, data, statusCode } = await ProductService.deleteProduct(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[MainstackException] - [ExceptionHandler] - [store.controller.deleteAProduct]: ${error?.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};
