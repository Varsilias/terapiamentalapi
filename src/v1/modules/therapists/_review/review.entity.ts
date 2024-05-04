import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../../../common/base-entity";
import { UserEntity } from "../../auth/_user/user.entity";
import { TherapistEntity } from "../therapists.entity";

@Entity({ name: "reviews" })
export class ReviewEntity extends BaseEntity<ReviewEntity> {
  @Column({ type: "varchar", nullable: false })
  location!: string;

  @Column({ type: "text", nullable: false })
  review!: string;

  @ManyToOne(() => UserEntity, (user) => user.therapist_reviews, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @ManyToOne(() => TherapistEntity, (therapist) => therapist.reviews, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "therapist_id" })
  therapist!: TherapistEntity;
}
