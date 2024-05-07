import { IRequest } from "../../../types/custom";
import { logger } from "../../../config/logger.config";
import { HttpStatus } from "../../../enums";
import { ICreateNotificationDto } from "./types";
import { Response } from "express";
import * as NotificationService from "./notification.service";

export const createNewNotification = async (req: IRequest, res: Response) => {
  try {
    const payload = { ...req.body, user_id: req.user.id } as ICreateNotificationDto;
    const { status, message, data, statusCode } =
      await NotificationService.createNotification(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [notification.controller.createNewNotification]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const getAllNotifications = async (req: IRequest, res: Response) => {
  try {
    const { status, message, data, statusCode } = await NotificationService.getNotifications(
      req.user.id,
    );
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [notification.controller.getAllNotifications]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const getUnreadNotificationsCount = async (req: IRequest, res: Response) => {
  try {
    const { status, message, data, statusCode } =
      await NotificationService.getUnreadNotificationCountForUser(req.user.id);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [notification.controller.getUnreadNotificationsCount]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const getANotification = async (req: IRequest, res: Response) => {
  console.log(req.params);

  try {
    const { status, message, data, statusCode } = await NotificationService.getNotification(
      req.params.notification_id,
    );
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [notification.controller.getANotification]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

export const markNotificationAsRead = async (req: IRequest, res: Response) => {
  console.log(req.params);

  try {
    const { status, message, data, statusCode } = await NotificationService.markAsRead(
      req.params.notification_id,
    );
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [notification.controller.markNotificationAsRead]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};
