import mongoose from "mongoose";
import { IProduct } from "../types";

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    storeId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Store",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantityAvailable: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: false,
      default: true,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true },
);

export const Store = mongoose.model("Store", ProductSchema);
