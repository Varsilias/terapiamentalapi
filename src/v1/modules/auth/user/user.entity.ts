import { BaseEntity } from "../../../../common/base-entity";
import { Column, Entity } from "typeorm";
import { GenderEnum } from "../types";

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

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "varchar" })
  salt!: string;

  @Column({ default: false })
  onboarding_done!: boolean;

  sanitize() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, salt, ...rest } = this;
    return {
      ...rest,
    };
  }
}
