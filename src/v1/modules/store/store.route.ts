import { Router } from "express";
import { REQUEST_FIELD } from "../../../enums/";
import * as schema from "./validation-schemas";
import { authCheck, validateRequest } from "../auth/middlewares";
import * as StoreController from "./store.controller";
import * as ProductController from "./product/product.controller";

export const storeRouter = Router();

storeRouter.post(
  "/",
  authCheck,
  validateRequest(REQUEST_FIELD.BODY, schema.CreateStoreSchema),
  StoreController.createNewStore,
);

storeRouter.get(
  "/",
  authCheck,
  validateRequest(REQUEST_FIELD.QUERY, schema.GetAllStoresSchema),
  StoreController.getAllStores,
);

storeRouter.get(
  "/:storeId",
  authCheck,
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetAStoreSchema),
  StoreController.getAStore,
);

storeRouter.patch(
  "/:storeId",
  authCheck,
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetAStoreSchema),
  validateRequest(REQUEST_FIELD.BODY, schema.UpdateAStoreBodySchema),
  StoreController.updateAStore,
);

storeRouter.delete(
  "/:storeId",
  authCheck,
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetAStoreSchema),
  StoreController.deleteAStore,
);

storeRouter.post(
  "/:storeId/product",
  authCheck,
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetAStoreSchema),
  validateRequest(REQUEST_FIELD.BODY, schema.CreateProductSchema),
  ProductController.createNewProduct,
);

storeRouter.get(
  "/:storeId/product",
  authCheck,
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetAStoreSchema),
  validateRequest(REQUEST_FIELD.QUERY, schema.GetAllStoresSchema),
  ProductController.getAllProducts,
);

storeRouter.get(
  "/:storeId/product/:productId",
  authCheck,
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetStoreProductSchema),
  ProductController.getAProduct,
);

storeRouter.patch(
  "/:storeId/product/:productId",
  authCheck,
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetStoreProductSchema),
  validateRequest(REQUEST_FIELD.BODY, schema.UpdateStoreProductSchema),
  ProductController.updateAProduct,
);

storeRouter.delete(
  "/:storeId/product/:productId",
  authCheck,
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetStoreProductSchema),
  ProductController.deleteAProduct,
);
