import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../../common/base-entity";

@Entity({ name: "specialities" })
export class SpecialityEntity extends BaseEntity<SpecialityEntity> {
  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "text" })
  description!: string;
}
