import { Router } from "express";
import { authCheck, validateRequest } from "../auth/middlewares";
import { REQUEST_FIELD } from "../../../enums";
import * as NotificationController from "./notification.controller";
import * as schema from "./schema-validator";

export const notificationRouter = Router();

notificationRouter.post(
  "/",
  authCheck,
  validateRequest(REQUEST_FIELD.BODY, schema.CreateNotificationSchema),
  NotificationController.createNewNotification,
);

notificationRouter.get("/", authCheck, NotificationController.getAllNotifications);

notificationRouter.get(
  "/unread-count",
  authCheck,
  NotificationController.getUnreadNotificationsCount,
);

notificationRouter.get(
  "/:notification_id",
  authCheck,
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetNotificationSchema),
  NotificationController.getANotification,
);

notificationRouter.patch(
  "/:notification_id",
  authCheck,
  validateRequest(REQUEST_FIELD.PARAMS, schema.GetNotificationSchema),
  NotificationController.markNotificationAsRead,
);
