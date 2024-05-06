import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../../../common/base-entity";
import { TherapistEntity } from "../therapists.entity";

@Entity({ name: "ratings" })
export class RatingEntity extends BaseEntity<RatingEntity> {
  @Column({ type: "integer" })
  value!: number;

  @ManyToOne(() => TherapistEntity, (therapist) => therapist.ratings, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "therapist_id" })
  therapist!: TherapistEntity;
}
