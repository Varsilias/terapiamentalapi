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
