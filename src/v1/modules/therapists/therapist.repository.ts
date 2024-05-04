import { AppDataSource } from "../../../database/sql";
import { TherapistEntity } from "./therapists.entity";

const QUERY_BUILDER_NAME = "therapist";

export const TherapistRepository = AppDataSource.getRepository(TherapistEntity).extend({
  async getPaginated(page: number, perPage: number, skip: number) {
    const totalRecords = await this.count();
    const totalPages = Math.ceil(totalRecords / perPage);
    const data = await this.createQueryBuilder(QUERY_BUILDER_NAME)
      .leftJoinAndSelect(`${QUERY_BUILDER_NAME}.category`, "category")
      .leftJoinAndSelect(`${QUERY_BUILDER_NAME}.specialities`, "specialities")
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

  async getAll() {
    const data = await this.createQueryBuilder(QUERY_BUILDER_NAME)
      .leftJoinAndSelect(`${QUERY_BUILDER_NAME}.category`, "category")
      .leftJoinAndSelect(`${QUERY_BUILDER_NAME}.specialities`, "specialities")
      .where(`${QUERY_BUILDER_NAME}.deleted_at IS NULL`)
      .getMany();

    return data;
  },
});
