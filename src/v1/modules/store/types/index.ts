import { ObjectId } from "mongoose";

export interface IStore {
  _id: string | ObjectId;
  userId: string | ObjectId;
  name: string;
  logo: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date;
}

export interface IProduct {
  _id: string | ObjectId;
  storeId: string | ObjectId;
  name: string;
  description: string;
  price: number;
  quantityAvailable: number;
  inStock: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date;
}

export interface ICreateStoreDto {
  name: string;
  userId: string;
  logo?: string;
}

export interface IGetAllStoresDto {
  page: number;
  perPage: number;
  userId: string;
}

export interface IGetAStoreDto {
  storeId: string;
  userId: string;
}

export interface IUpdateAStore {
  name?: string;
  logo?: string;
  storeId: string;
  userId: string;
}

export interface IDeleteAStore {
  storeId: string;
  userId: string;
}

export interface ICreateProductDto {
  name: string;
  description: string;
  price: number;
  quantityAvailable: number;
  storeId: string;
  userId: string;
}

export interface IGetAllProductsDto {
  page: number;
  perPage: number;
  storeId: string;
  userId: string;
}

export interface IGetAProductDto {
  storeId: string;
  productId: string;
  userId: string;
}

export interface IUpdateAProduct {
  name?: string;
  description?: string;
  price?: number;
  quantityAvailable?: number;
  storeId: string;
  productId: string;
  userId: string;
}

export interface IDeleteAProduct {
  storeId: string;
  productId: string;
  userId: string;
}
