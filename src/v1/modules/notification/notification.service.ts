import { HttpStatus } from "../../../enums";
import { UserRepository } from "../auth/_user/user.repository";
import { NotificationRepository } from "./notification.repository";
import { ICreateNotificationDto } from "./types";

export const createNotification = async (payload: ICreateNotificationDto) => {
  const { user_id, body, title } = payload;

  const user = await UserRepository.findOne({ where: { id: user_id } });

  if (!user) {
    return {
      status: false,
      statusCode: HttpStatus.NOT_FOUND,
      message: "User record not found",
    };
  }

  const entity = NotificationRepository.create({ body, title, user });
  const notification = await NotificationRepository.save(entity);

  return {
    status: true,
    statusCode: HttpStatus.OK,
    message: "Notification created successfully",
    data: notification,
  };
};

export const getNotifications = async (user_id: any) => {
  const notifications = await NotificationRepository.getNotificationsForUser(user_id);

  return {
    status: true,
    statusCode: HttpStatus.OK,
    message: "Notifications retrieved successfully",
    data: notifications,
  };
};

export const getUnreadNotificationCountForUser = async (user_id: any) => {
  const notifications = await NotificationRepository.getUnreadNotificationCountForUser(user_id);

  return {
    status: true,
    statusCode: HttpStatus.OK,
    message: "Notifications retrieved successfully",
    data: notifications.length,
  };
};

export const getNotification = async (notification_id: any) => {
  const notification = await NotificationRepository.findOne({
    where: { id: notification_id },
  });

  if (!notification) {
    return {
      status: false,
      statusCode: HttpStatus.NOT_FOUND,
      message: "Notification not found",
    };
  }

  return {
    status: true,
    statusCode: HttpStatus.OK,
    message: "Notification retrieved successfully",
    data: notification,
  };
};

export const markAsRead = async (notification_id: any) => {
  const updatePayload = await NotificationRepository.update(
    { id: notification_id },
    { read: true },
  );

  if (!updatePayload.affected || updatePayload.affected <= 0) {
    return {
      status: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Unable to mark notification as read",
    };
  }

  const { data: updatedNotification } = await getNotification(notification_id);

  return {
    status: true,
    statusCode: HttpStatus.OK,
    message: "Notification marked as read",
    data: updatedNotification,
  };
};
