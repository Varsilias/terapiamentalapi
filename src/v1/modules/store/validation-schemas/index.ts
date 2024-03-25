import { Types } from "mongoose";
import { z } from "zod";

export const CreateStoreSchema = z.object({
  name: z.string({
    required_error: "Store name is required",
    invalid_type_error: "Store name must be a string",
  }),
});

export const GetAllStoresSchema = z.object({
  page: z.coerce
    .number({
      required_error: "Page is required",
      invalid_type_error: "Page must be an integer",
    })
    .positive({ message: `Page must be a positive integer` }),
  perPage: z.coerce
    .number({
      required_error: "PerPage is required",
      invalid_type_error: "PerPage number must be an integer",
    })
    .positive({ message: `PerPage must be a positive integer` }),
});

export const GetAStoreSchema = z.object({
  storeId: z
    .string({
      required_error: "Store ID is required",
      invalid_type_error: "Store ID must be a string",
    })
    .refine(
      (data) => {
        return Types.ObjectId.isValid(data);
      },
      { message: "Store ID must be a valid ID" },
    ),
});

export const GetStoreProductSchema = z.object({
  storeId: z
    .string({
      required_error: "Store ID is required",
      invalid_type_error: "Store ID must be a string",
    })
    .refine(
      (data) => {
        return Types.ObjectId.isValid(data);
      },
      { message: "Store ID must be a valid ID" },
    ),
  productId: z
    .string({
      required_error: "Product ID is required",
      invalid_type_error: "Product ID must be a string",
    })
    .refine(
      (data) => {
        return Types.ObjectId.isValid(data);
      },
      { message: "Product ID must be a valid ID" },
    ),
});

export const UpdateAStoreBodySchema = z.object({
  name: z
    .string({
      invalid_type_error: "Store name must be a string",
    })
    .optional(),
  logo: z
    .string({
      invalid_type_error: "Store name must be a string",
    })
    .optional(),
});

export const CreateProductSchema = z.object({
  name: z.string({
    required_error: "Product name is required",
    invalid_type_error: "Product name must be a string",
  }),
  description: z.string({
    required_error: "Product description is required",
    invalid_type_error: "Product description must be a string",
  }),
  price: z.coerce
    .number({
      required_error: "Product price is required",
      invalid_type_error: "Product price must be a number",
    })
    .positive({ message: `Product price must be a positive integer` }),
  quantityAvailable: z.coerce
    .number({
      required_error: "Product quantity available is required",
      invalid_type_error: "Product quantity available must be a number",
    })
    .positive({ message: `Product quantity must be a positive integer` }),
});

export const UpdateStoreProductSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Product name must be a string",
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: "Product description must be a string",
    })
    .optional(),
  price: z.coerce
    .number({
      invalid_type_error: "Product price must be a number",
    })
    .positive({ message: `Product price must be a positive integer` })
    .optional(),
  quantityAvailable: z.coerce
    .number({
      invalid_type_error: "Product quantity available must be a number",
    })
    .positive({ message: `Product quantity must be a positive integer` })
    .optional(),
});
