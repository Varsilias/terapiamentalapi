import { z } from "zod";
export const CreateStepOptionsSchema = z.object({
  name: z
    .string({
      required_error: "Option name is required",
      invalid_type_error: "Option name must be a string",
    })
    .max(50, { message: "Must be 50 or fewer characters long" }),

  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a string",
  }),

  options: z
    .array(
      z.object({
        name: z
          .string({
            required_error: "Step name is required",
            invalid_type_error: "Step name must be a string",
          })
          .max(50, { message: "Must be 50 or fewer characters long" }),
        description: z
          .string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a string",
          })
          .optional(),
      }),
      {
        required_error: "Options list is required",
        invalid_type_error: "Options must be an array of option name and description",
      },
    )
    .min(1, { message: "Options must have at least on item in the list" }),
});

export const UpdateStepOptionsSchema = z.object({
  options: z
    .array(
      z.object({
        name: z
          .string({
            required_error: "Option name is required",
            invalid_type_error: "Option name must be a string",
          })
          .max(50, { message: "Must be 50 or fewer characters long" }),
        description: z
          .string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a string",
          })
          .optional(),
      }),
      {
        required_error: "Options list is required",
        invalid_type_error: "Options must be an array of option name and description",
      },
    )
    .min(1, { message: "Options must have at least on item in the list" }),
});

export const GetStepchema = z.object({
  stepId: z.coerce
    .number({
      required_error: "Step ID is required",
      invalid_type_error: "Step ID must be a number",
    })
    .positive({ message: "Step ID must be a positive integer" }),
});

export const DeleteStepOptionSchema = z.object({
  stepId: z.coerce
    .number({
      required_error: "Step ID is required",
      invalid_type_error: "Step ID must be a number",
    })
    .positive({ message: "Step ID must be a positive integer" }),

  optionId: z.coerce
    .number({
      required_error: "Option ID is required",
      invalid_type_error: "Option ID must be a number",
    })
    .positive({ message: "Option ID must be a positive integer" }),
});

export const GetAllStepsSchema = z.object({
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

export const PaginationSchema = z.object({
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

export const OnboardingSelectionSchema = z.object({
  step_id: z.coerce
    .number({
      required_error: "Step ID is required",
      invalid_type_error: "Step ID must be a number",
    })
    .positive({ message: "Step ID must be a positive integer" }),

  options: z
    .array(
      z.coerce
        .number({
          required_error: "Option ID is required",
          invalid_type_error: "Options List elements must be numbers",
        })
        .positive({ message: "Option ID must be a positive integer" }),
      {
        required_error: "Options list is required",
        invalid_type_error: "Options must be an array of selected IDs",
      },
    )
    .min(1, { message: "Options must have at least on item in the list" }),
  custom_option: z
    .string({
      invalid_type_error: "Custome Option must be a string",
    })
    .max(50, { message: "Custom option Must be 50 or fewer characters long" })
    .optional(),
});
