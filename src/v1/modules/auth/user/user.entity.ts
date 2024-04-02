import { BaseEntity } from "../../../../common/base.entity";
import { Entity } from "typeorm";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity<UserEntity> {}
