import { BaseEntity } from "../../../../common/base-entity";
import { Column, Entity, OneToMany } from "typeorm";
import { OptionEntity } from "./option.entity";

@Entity({ name: "steps" })
export class StepEntity extends BaseEntity<StepEntity> {
  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  description!: string;

  @OneToMany(() => OptionEntity, (options) => options.step)
  options!: OptionEntity[];
}
