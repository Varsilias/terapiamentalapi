import { ObjectId } from "mongoose";

export interface IStore {
  userId: string | ObjectId;
  name: string;
  logo: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date;
}
