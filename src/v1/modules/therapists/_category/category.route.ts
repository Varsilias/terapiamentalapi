import { Router } from "express";
import { validateRequest } from "../../auth/middlewares";
import { REQUEST_FIELD } from "../../../../enums";
import * as CategoryController from "./category.controller";
import * as schema from "../schema-validator";
import { PaginationSchema } from "../../onboarding/schema-validator";

export const categoryRouter = Router();

categoryRouter.post(
  "/",
  validateRequest(REQUEST_FIELD.BODY, schema.CreateCategorySchema),
  CategoryController.createNewCategory,
);

categoryRouter.get(
  "/",
  validateRequest(REQUEST_FIELD.QUERY, PaginationSchema),
  CategoryController.getAllCategories,
);
