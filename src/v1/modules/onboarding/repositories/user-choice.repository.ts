import { AppDataSource } from "../../../../database/sql";
import { UserChoiceEntity } from "../entites/user-choice.entity";

export const UserChoiceRepository = AppDataSource.getRepository(UserChoiceEntity).extend({});
