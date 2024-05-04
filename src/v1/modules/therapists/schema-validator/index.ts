import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name  must be a string",
    })
    .min(3, "Name must be a string of more that 3 characters"),

  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description  must be a string",
    })
    .min(3, "Name must be a string of more that 3 characters"),
});

export const CreateTherapistSchema = z.object({
  firstname: z
    .string({
      required_error: "Firstname is required",
      invalid_type_error: "Firstname  must be a string",
    })
    .min(3, "Firstname must be a string of more that 3 characters"),
  lastname: z
    .string({
      required_error: "Lastname is required",
      invalid_type_error: "Lastname  must be a string",
    })
    .min(3, "Lastname must be a string of more that 3 characters"),
  location: z
    .string({
      required_error: "Location is required",
      invalid_type_error: "Location  must be a string",
    })
    .min(3, "Location must be a string of more that 3 characters"),
  charges_per_hour: z.coerce
    .number({
      required_error: "Charge is required",
      invalid_type_error: "Charge must be a number",
    })
    .positive("Charge must be a positive integer")
    .min(1000, "You can not charge below 1000"),
  experience: z.coerce
    .number({
      required_error: "Experience is required",
      invalid_type_error: "Experience must be a number",
    })
    .positive("Experience must be a positive integer")
    .min(2, "You need to possess at least 2 years of professional experience"),
  bio: z
    .string({
      required_error: "Bio is required",
      invalid_type_error: "Bio must be a string",
    })
    .min(50, "Bio must be a string of more that 50 characters"),
  category_id: z.coerce
    .number({
      required_error: "Category is required",
      invalid_type_error: "Category must be a number",
    })
    .positive("Category must be a positive integer")
    .min(1, "Please choose at a category"),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email  must be a string",
    })
    .email("Email must be an email"),
  specialties: z
    .array(
      z.coerce
        .number({
          required_error: "Speciality is required",
          invalid_type_error: "Speciality List elements must be numbers",
        })
        .positive({ message: "Speciality ID must be a positive integer" }),
      {
        required_error: "Speciality list is required",
        invalid_type_error: "Speciality must be an array of selected IDs",
      },
    )
    .min(1, { message: "Speciality must have at least on item in the list" }),
});

export const UpdateTherapistSchema = z.object({
  firstname: z
    .string({
      required_error: "Firstname is required",
      invalid_type_error: "Firstname  must be a string",
    })
    .min(3, "Firstname must be a string of more that 3 characters")
    .optional(),
  lastname: z
    .string({
      required_error: "Lastname is required",
      invalid_type_error: "Lastname  must be a string",
    })
    .min(3, "Lastname must be a string of more that 3 characters")
    .optional(),
  location: z
    .string({
      required_error: "Location is required",
      invalid_type_error: "Location  must be a string",
    })
    .min(3, "Location must be a string of more that 3 characters")
    .optional(),
  charges_per_hour: z.coerce
    .number({
      required_error: "Charge is required",
      invalid_type_error: "Charge must be a number",
    })
    .positive("Charge must be a positive integer")
    .min(1000, "You can not charge below 1000")
    .optional(),
  experience: z.coerce
    .number({
      required_error: "Experience is required",
      invalid_type_error: "Experience must be a number",
    })
    .positive("Experience must be a positive integer")
    .min(2, "You need to possess at least 2 years of professional experience")
    .optional(),
  bio: z
    .string({
      required_error: "Bio is required",
      invalid_type_error: "Bio must be a string",
    })
    .min(50, "Bio must be a string of more that 50 characters")
    .optional(),
  specialties: z
    .array(
      z.coerce
        .number({
          required_error: "Speciality is required",
          invalid_type_error: "Speciality List elements must be numbers",
        })
        .positive({ message: "Speciality ID must be a positive integer" }),
      {
        required_error: "Speciality list is required",
        invalid_type_error: "Speciality must be an array of selected IDs",
      },
    )
    .min(1, { message: "Speciality must have at least on item in the list" }),
});
export const GetATherapist = z.object({
  therapistId: z.coerce
    .number({
      required_error: "Therapist ID is required",
      invalid_type_error: "Therapist ID must be a number",
    })
    .positive("Therapist ID must be a positive integer"),
});

export const CreateReviewSchema = z.object({
  location: z.string({
    required_error: "Location is required",
    invalid_type_error: "Location  must be a string",
  }),

  review: z.string({
    required_error: "Review is required",
    invalid_type_error: "Review  must be a string",
  }),
  therapist_id: z.coerce
    .number({
      required_error: "Therapist ID is required",
      invalid_type_error: "Therapist ID must be a number",
    })
    .positive("Therapist ID must be a positive integer"),
});

export const GetReviewSchema = z.object({
  therapist_id: z.coerce
    .number({
      required_error: "Therapist ID is required",
      invalid_type_error: "Therapist ID must be a number",
    })
    .positive("Therapist ID must be a positive integer"),
});
