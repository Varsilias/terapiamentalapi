import { AppDataSource } from "../../../../database/sql";
import { SpecialityEntity } from "./specialities.entity";

const QUERY_BUILDER_NAME = "speciality";

export const SpecialityRepository = AppDataSource.getRepository(SpecialityEntity).extend({
  async getPaginated(page: number, perPage: number, skip: number) {
    const totalRecords = await this.count();
    const totalPages = Math.ceil(totalRecords / perPage);
    const data = await this.createQueryBuilder(QUERY_BUILDER_NAME)
      .where(`${QUERY_BUILDER_NAME}.deleted_at IS NULL`)
      .skip(skip)
      .take(perPage)
      .getMany();

    return {
      page,
      perPage,
      totalPages,
      totalRecords,
      data,
    };
  },

  async findSpecialitiesById(ids: number[]) {
    const data = await this.createQueryBuilder(QUERY_BUILDER_NAME)
      .where(`${QUERY_BUILDER_NAME}.id IN (:...ids)`, {
        ids,
      })
      .getMany();

    return data;
  },
});
