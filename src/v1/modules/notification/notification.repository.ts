import { AppDataSource } from "../../../database/sql";
import { NotificationEntity } from "./notification.entity";

const BUILDER_NAME = "notification";
export const NotificationRepository = AppDataSource.getRepository(NotificationEntity).extend({
  async getNotificationsForUser(user_id: number) {
    const notifications = await this.createQueryBuilder(BUILDER_NAME)
      .where(`${BUILDER_NAME}.user.id = :user_id`, { user_id })
      .getMany();

    return notifications;
  },

  async getUnreadNotificationCountForUser(user_id: number) {
    const notifications = await this.createQueryBuilder(BUILDER_NAME)
      .where(`${BUILDER_NAME}.user.id = :user_id`, { user_id })
      .andWhere(`${BUILDER_NAME}.read = :read`, { read: false })
      .getMany();

    return notifications;
  },
});
