import { z } from "zod";

export const CreateAppReviewSchema = z.object({
  location: z.string({
    required_error: "Location is required",
    invalid_type_error: "Location  must be a string",
  }),

  review: z.string({
    required_error: "Review is required",
    invalid_type_error: "Review  must be a string",
  }),
});
