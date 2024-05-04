import { BaseEntity } from "../../../../common/base-entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { OptionEntity } from "./option.entity";
import { UserEntity } from "../../auth/_user/user.entity";

@Entity({ name: "user_choices" })
export class UserChoiceEntity extends BaseEntity<UserChoiceEntity> {
  @Column({ type: "varchar", nullable: true })
  custom_option!: string;

  @ManyToOne(() => UserEntity, (user) => user.user_choices, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @ManyToOne(() => OptionEntity, (options) => options.user_choices, { onDelete: "CASCADE" })
  @JoinColumn({ name: "option_id" })
  option!: OptionEntity;
}
