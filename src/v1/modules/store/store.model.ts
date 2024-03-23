import mongoose from "mongoose";
import { IStore } from "./types";

const StoreSchema = new mongoose.Schema<IStore>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true },
);

export const Store = mongoose.model("Store", StoreSchema);
