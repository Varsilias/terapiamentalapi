import { z } from "zod";
import { GenderEnum } from "../types";

const reusableSchema = {
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .regex(/^(?=.*[A-Z])/, { message: "Password must contain at least one uppercase letter." })
    .regex(/^(?=.*[a-z])/, { message: "Password must contain at least one lowercase letter." })
    .regex(/^(?=.*\d)/, { message: "Password must contain at least one number." })
    .regex(/^(?=.*[@$!%*?&])/, {
      message: "Password must contain at least one special character.",
    })
    .min(8, { message: "Password must be at least 8 characters" }),
};

export const SignUpSchema = z.object({
  lastname: z.string({
    required_error: "Lastname is required",
    invalid_type_error: "Lastname must be a string",
  }),
  firstname: z.string({
    required_error: "Firstname is required",
    invalid_type_error: "Firstname must be a string",
  }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Please provide a valid email" }),
  phone_number: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be a string",
    })
    .regex(/^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/, {
      message: "Phone number must follow the required pattern",
    }),
  date_of_birth: z
    .string({
      invalid_type_error: "Date of birth must be string",
      required_error: "Date of birth is required",
    })
    .datetime({ message: "Date of birth must be a ISO 8601 compliant date", offset: true }),
  gender: z.nativeEnum(GenderEnum, {
    invalid_type_error: "Gender must be either male or female",
    required_error: "Gender is required",
  }),
  ...reusableSchema,
});

export const SignInSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Please provide a valid email" }),
  ...reusableSchema,
});

export const RefreshTokenSchema = z.object({
  refresh_token: z.string({
    required_error: "Refresh token is required",
    invalid_type_error: "Refresh token must be a string",
  }),
});
