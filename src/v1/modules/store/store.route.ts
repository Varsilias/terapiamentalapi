import { Router } from "express";
import { HttpStatus, REQUEST_FIELD } from "../../../enums/";
// import { IRequest } from "../../../types/custom";
import * as schema from "./validation-schemas";
import { validateRequest } from "../auth/middlewares";

export const storeRouter = Router();

storeRouter.post("/", validateRequest(REQUEST_FIELD.BODY, schema.CreateStoreSchema), (req, res) => {
  return res.status(HttpStatus.OK).json({ message: "You have reached create store route" });
});

storeRouter.get(
  "/",
  validateRequest(REQUEST_FIELD.QUERY, schema.GetAllStoresSchema),
  (req, res) => {
    return res.status(HttpStatus.OK).json({ message: "You have reached get all stores route" });
  },
);

storeRouter.get(
  "/:storeId",
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetAStoreSchema),
  (req, res) => {
    return res.status(HttpStatus.OK).json({ message: "You have reached get single stores route" });
  },
);

storeRouter.patch(
  "/:storeId",
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetAStoreSchema),
  (req, res) => {
    return res.status(HttpStatus.OK).json({ message: "You have reached update store route" });
  },
);

storeRouter.delete(
  "/:storeId",
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetAStoreSchema),
  (req, res) => {
    return res.status(HttpStatus.OK).json({ message: "You have reached delete store route" });
  },
);

storeRouter.post(
  "/:storeId/product",
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetAStoreSchema),
  (req, res) => {
    return res.status(HttpStatus.OK).json({ message: "You have reached create product route" });
  },
);

storeRouter.get(
  "/:storeId/product",
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetAStoreSchema),
  (req, res) => {
    return res
      .status(HttpStatus.OK)
      .json({ message: "You have reached get all store products route" });
  },
);

storeRouter.get(
  "/:storeId/product/:productId",
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetStoreProductSchema),
  (req, res) => {
    return res
      .status(HttpStatus.OK)
      .json({ message: "You have reached get single product from store route" });
  },
);

storeRouter.patch(
  "/:storeId/product/:productId",
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetStoreProductSchema),
  (req, res) => {
    return res
      .status(HttpStatus.OK)
      .json({ message: "You have reached update single product from store route" });
  },
);

storeRouter.delete(
  "/:storeId/product/:productId",
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetStoreProductSchema),
  (req, res) => {
    return res
      .status(HttpStatus.OK)
      .json({ message: "You have delete single product from store route" });
  },
);
