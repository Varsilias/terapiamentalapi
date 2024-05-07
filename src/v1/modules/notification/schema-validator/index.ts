import { z } from "zod";

export const CreateNotificationSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title  must be a string",
    })
    .min(3, "Title must be a string of more that 3 characters"),
  body: z
    .string({
      required_error: "Body is required",
      invalid_type_error: "Body must be a string",
    })
    .min(50, "Body must be a string of more that 50 characters"),
});

export const GetNotificationSchema = z.object({
  notification_id: z.coerce
    .number({
      required_error: "Notification ID is required",
      invalid_type_error: "Notification ID must be a number",
    })
    .positive("Notification ID must be a positive integer"),
});
