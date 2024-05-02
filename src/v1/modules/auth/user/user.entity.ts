import { BaseEntity } from "../../../../common/base-entity";
import { Column, Entity, OneToMany } from "typeorm";
import { GenderEnum } from "../types";
import { UserChoiceEntity } from "../../onboarding/entites/user-choice.entity";
import { AppReviewEntity } from "../../app-reviews/entities/app-reviews.entity";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity<UserEntity> {
  @Column({ type: "varchar" })
  firstname!: string;

  @Column({ type: "varchar" })
  lastname!: string;

  @Column({ unique: true, type: "varchar" })
  email!: string;

  @Column({ default: false })
  email_verified!: boolean;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  email_verified_at!: Date;

  @Column({ unique: true, type: "varchar" })
  phone_number!: string;

  @Column({ default: false })
  phone_verified!: boolean;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  phone_verified_at!: Date;

  @Column({
    type: "timestamp",
  })
  date_of_birth!: Date;

  @Column({
    type: "enum",
    enum: GenderEnum,
    enumName: "GenderEnum",
    nullable: true,
  })
  gender!: GenderEnum;

  @Column({ type: "varchar", nullable: true })
  profile_url!: string;

  @Column({ type: "varchar", nullable: true })
  oauth_id!: string;

  @Column({ type: "varchar", select: false })
  password!: string;

  @Column({ type: "varchar", select: false })
  salt!: string;

  @Column({ default: false })
  onboarding_done!: boolean;

  @OneToMany(() => UserChoiceEntity, (choices) => choices.option, {
    cascade: ["remove"], // we are using remove because we are limited in storage
  })
  user_choices!: UserChoiceEntity[];

  @OneToMany(() => AppReviewEntity, (review) => review.user, {
    cascade: ["remove"], // we are using remove because we are limited in storage
  })
  app_review!: AppReviewEntity[];

  sanitize() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, salt, ...rest } = this;
    return {
      ...rest,
    };
  }
}
