import { AppDataSource } from "../../../../database/sql";
import { StepEntity } from "../entites/step.entity";

export const StepRepository = AppDataSource.getRepository(StepEntity).extend({
  async getPaginated(page: number, perPage: number, skip: number) {
    const totalRecords = await this.count();
    const totalPages = Math.ceil(totalRecords / perPage);
    const data = await this.createQueryBuilder("step")
      .where("step.deleted_at = :deleted_at", { deleted_at: null })
      .leftJoinAndSelect("step.options", "options")
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
});
