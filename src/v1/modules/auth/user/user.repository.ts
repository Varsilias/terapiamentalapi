import { AppDataSource } from "../../../../database/sql";
import { UserEntity } from "./user.entity";

export const UserRepository = AppDataSource.getRepository(UserEntity).extend({});
