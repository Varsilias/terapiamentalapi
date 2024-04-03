import { BaseEntity } from "../../../../common/base-entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { StepEntity } from "./step.entity";
import { UserChoiceEntity } from "./user-choice.entity";

@Entity({ name: "options" })
export class OptionEntity extends BaseEntity<OptionEntity> {
  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar", nullable: true })
  description!: string;

  @ManyToOne(() => StepEntity, (step) => step.options, {
    onDelete: "CASCADE",
    cascade: ["remove"],
  })
  @JoinColumn({ name: "step_id" })
  step!: StepEntity;

  @OneToMany(() => UserChoiceEntity, (choices) => choices.option)
  user_choices!: UserChoiceEntity[];
}
