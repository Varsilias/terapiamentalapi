import { BaseEntity } from "../../../common/base-entity";
import { Column, Entity, Generated, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "../auth/_user/user.entity";

@Entity({ name: "notifications" })
export class NotificationEntity extends BaseEntity<NotificationEntity> {
  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "text" })
  body!: string;

  @Column({ unique: true })
  @Generated("uuid")
  reference!: string;

  @Column({ type: "boolean", default: false })
  read!: boolean;

  @ManyToOne(() => UserEntity, (user) => user.notifications, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;
}
