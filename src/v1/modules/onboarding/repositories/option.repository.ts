import { AppDataSource } from "../../../../database/sql";
import { OptionEntity } from "../entites/option.entity";

export const OptionRepository = AppDataSource.getRepository(OptionEntity).extend({});
