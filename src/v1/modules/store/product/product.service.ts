import { Types } from "mongoose";
import { HttpStatus } from "../../../../enums";
import { Product } from "./product.model";
import {
  ICreateProductDto,
  IDeleteAProduct,
  IGetAProductDto,
  IGetAllProductsDto,
  IProduct,
  IUpdateAProduct,
} from "../types";
import { pipeline } from "../../../../utils/model-pipeline";
import { extractAggregrationData } from "../../../../utils/extract-aggregation-data";
import * as StoreService from "../store.service";

export const createProduct = async (payload: ICreateProductDto) => {
  const { name, storeId, description, price, quantityAvailable, userId } = payload;

  const {
    status: storeExists,
    message,
    statusCode,
    data,
  } = await StoreService.getStore({ storeId, userId });

  if (!storeExists) {
    return {
      status: storeExists,
      message: message,
      statusCode,
    };
  }

  const product = (await new Product({
    name,
    storeId: data?._id,
    description,
    price,
    quantityAvailable,
  }).save()) as IProduct;
  return {
    status: true,
    message: "Product created successfully",
    statusCode: HttpStatus.OK,
    data: product,
  };
};

export const getProducts = async (payload: IGetAllProductsDto) => {
  let { page, perPage } = payload;
  const storeId = payload.storeId;
  const userId = payload.userId;

  const {
    status: storeExists,
    message,
    statusCode,
  } = await StoreService.getStore({ storeId, userId });

  if (!storeExists) {
    return {
      status: storeExists,
      message: message,
      statusCode,
    };
  }

  page = page * 1 || 1;
  perPage = perPage * 1 || 10;

  const skip = (page - 1) * perPage;

  const stages = [
    {
      $match: {
        $and: [
          { storeId: new Types.ObjectId(storeId) },
          { $or: [{ deletedAt: null }, { deletedAt: undefined }] },
        ],
      },
    },
  ];

  const pipelineResult = await pipeline<IProduct>({ Model: Product, stages, perPage, skip });

  return {
    status: false,
    message: "Products fetched successfully",
    statusCode: HttpStatus.OK,
    data: {
      page,
      perPage,
      ...extractAggregrationData(pipelineResult).analytics,
      stores: extractAggregrationData(pipelineResult).data,
    },
  };
};

export const getProduct = async (payload: IGetAProductDto) => {
  const { storeId, productId, userId } = payload;
  const {
    status: storeExists,
    message,
    statusCode,
  } = await StoreService.getStore({ storeId, userId });

  if (!storeExists) {
    return {
      status: storeExists,
      message: message,
      statusCode,
    };
  }
  const product = await Product.findOne({ _id: productId, storeId });

  if (!product) {
    return {
      status: false,
      message: "Product not found",
      statusCode: HttpStatus.NOT_FOUND,
    };
  }

  return {
    status: true,
    message: "Product retrieved successfully",
    statusCode: HttpStatus.OK,
    data: product,
  };
};

export const updateProduct = async (payload: IUpdateAProduct) => {
  const { storeId, productId, userId, ...rest } = payload;
  const { status, message, statusCode, data } = await getProduct({ storeId, userId, productId });

  if (!status) {
    return {
      status,
      message,
      statusCode,
    };
  }

  // Prevent unnecessary database calls
  if (!Object.values({ ...rest }).every((item) => !!item)) {
    return {
      status: false,
      message: "Nothing to update",
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }
  const product = await Product.updateOne({ _id: data?._id, storeId: data?.storeId }, { ...rest });

  if (product.modifiedCount <= 0) {
    return {
      status: true,
      message: "Unable to update product",
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  }

  const updatedStore = await Product.findOne({ storeId, _id: productId });

  return {
    status: true,
    message: "Product updated successfully",
    statusCode: HttpStatus.OK,
    data: updatedStore,
  };
};

export const deleteProduct = async (payload: IDeleteAProduct) => {
  const { storeId, productId, userId } = payload;
  const { status, message, statusCode, data } = await getProduct({ storeId, userId, productId });

  if (!status) {
    return {
      status,
      message,
      statusCode,
    };
  }

  const store = await Product.updateOne(
    { _id: data?._id, storeId: data?.storeId },
    { deletedAt: new Date() },
  );

  if (store.modifiedCount <= 0) {
    return {
      status: true,
      message: "Unable to delete product",
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  }

  const deletedProduct = await Product.findOne({ storeId, _id: productId });

  return {
    status: true,
    message: "Product deleted successfully",
    statusCode: HttpStatus.OK,
    data: deletedProduct,
  };
};
