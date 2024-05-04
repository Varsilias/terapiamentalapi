import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../../common/base-entity";

@Entity({ name: "categories" })
export class CategoryEntity extends BaseEntity<CategoryEntity> {
  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "text" })
  description!: string;
}
