import { BaseEntity } from "../../../../common/base-entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "../../auth/user/user.entity";

@Entity({ name: "app_reviews" })
export class AppReviewEntity extends BaseEntity<AppReviewEntity> {
  @Column({ type: "varchar", nullable: false })
  location!: string;

  @ManyToOne(() => UserEntity, (user) => user.app_review, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @Column({ type: "text", nullable: false })
  review!: string;
}
