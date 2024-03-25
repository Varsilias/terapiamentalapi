import { z } from "zod";

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
  username: z.string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string",
  }),
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
  storename: z.string({
    required_error: "Storename is required",
    invalid_type_error: "Storename must be a string",
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
