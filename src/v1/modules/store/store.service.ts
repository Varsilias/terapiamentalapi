import { Types } from "mongoose";
import { HttpStatus } from "../../../enums";
import { Store } from "./store.model";
import {
  ICreateStoreDto,
  IDeleteAStore,
  IGetAStoreDto,
  IGetAllStoresDto,
  IStore,
  IUpdateAStore,
} from "./types";
import { pipeline } from "../../../utils/model-pipeline";
import { extractAggregrationData } from "../../../utils/extract-aggregation-data";

export const createStore = async (payload: ICreateStoreDto) => {
  const { name, userId, logo } = payload;
  const storeExists = await Store.findOne({ name });

  if (storeExists) {
    return {
      status: false,
      message: "The store name you provided already exist. Kindly use a new store name.",
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  const store = (await new Store({ name, userId, logo }).save()) as IStore;
  return {
    status: false,
    message: "Store created successfully",
    statusCode: HttpStatus.OK,
    data: store,
  };
};

export const getStores = async (payload: IGetAllStoresDto) => {
  let { page, perPage } = payload;
  const userId = payload.userId;

  page = page * 1 || 1;
  perPage = perPage * 1 || 10;

  const skip = (page - 1) * perPage;

  const stages = [
    {
      $match: {
        $and: [
          { userId: new Types.ObjectId(userId) },
          { $or: [{ deletedAt: null }, { deletedAt: undefined }] },
        ],
      },
    },
  ];

  const pipelineResult = await pipeline<IStore>({ Model: Store, stages, perPage, skip });

  return {
    status: true,
    message: "Stores fetched successfully",
    statusCode: HttpStatus.OK,
    data: {
      page,
      perPage,
      ...extractAggregrationData(pipelineResult).analytics,
      stores: extractAggregrationData(pipelineResult).data,
    },
  };
};

export const getStore = async (payload: IGetAStoreDto) => {
  const { storeId, userId } = payload;
  const store = (await Store.findOne({
    _id: storeId,
    userId,
    $or: [{ deletedAt: undefined }, { deletedAt: null }, { deletedAt: { $exists: false } }],
  })) as IStore;

  if (!store) {
    return {
      status: false,
      message: "Store not found",
      statusCode: HttpStatus.NOT_FOUND,
    };
  }

  return {
    status: true,
    message: "Store retrieved successfully",
    statusCode: HttpStatus.OK,
    data: store,
  };
};

export const updateStore = async (payload: IUpdateAStore) => {
  const { storeId, userId, name, logo } = payload;
  const { status, message, statusCode, data } = await getStore({ storeId, userId });

  if (!status) {
    return {
      status,
      message,
      statusCode,
    };
  }
  if (!name && !logo) {
    return {
      status: false,
      message: "Nothing to update",
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }
  const store = await Store.updateOne({ _id: data?._id, userId: data?.userId }, { name, logo });

  if (store.modifiedCount <= 0) {
    return {
      status: true,
      message: "Unable to update store",
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  }

  const updatedStore = (await Store.findOne({ userId, _id: storeId })) as IStore;

  return {
    status: true,
    message: "Store updated successfully",
    statusCode: HttpStatus.OK,
    data: updatedStore,
  };
};

export const deleteStore = async (payload: IDeleteAStore) => {
  const { storeId, userId } = payload;
  const { status, message, statusCode, data } = await getStore({ storeId, userId });

  if (!status) {
    return {
      status,
      message,
      statusCode,
    };
  }

  const store = await Store.updateOne(
    { _id: data?._id, userId: data?.userId },
    { deletedAt: new Date() },
  );

  if (store.modifiedCount <= 0) {
    return {
      status: true,
      message: "Unable to delete store",
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  }

  const deletedStore = (await Store.findOne({ userId, _id: storeId })) as IStore;

  return {
    status: true,
    message: "Store deleted successfully",
    statusCode: HttpStatus.OK,
    data: deletedStore,
  };
};
