import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../../common/base-entity";
import { CategoryEntity } from "./_category/category.entity";
import { SpecialityEntity } from "./_speciality/specialities.entity";
import { ReviewEntity } from "./_review/review.entity";
import { RatingEntity } from "./_rating/rating.entity";

@Entity({ name: "therapists" })
export class TherapistEntity extends BaseEntity<TherapistEntity> {
  @Column({ type: "varchar" })
  firstname!: string;

  @Column({ type: "varchar" })
  lastname!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "decimal" })
  charges_per_hour!: number;

  @Column({ type: "integer" })
  experience!: number;

  @Column({ type: "varchar" })
  location!: string;

  @Column({ type: "varchar", nullable: true })
  profile_image!: string;

  @Column({ type: "text" })
  bio!: string;

  @OneToOne(() => CategoryEntity)
  @JoinColumn({ name: "category_id" })
  category!: CategoryEntity;

  @ManyToMany(() => SpecialityEntity)
  @JoinTable()
  specialities!: SpecialityEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.therapist, {
    cascade: ["remove"], // we are using remove because we are limited in storage
  })
  reviews!: ReviewEntity[];

  @OneToMany(() => RatingEntity, (rating) => rating.therapist, {
    cascade: ["remove"], // we are using remove because we are limited in storage
  })
  ratings!: RatingEntity[];
}
