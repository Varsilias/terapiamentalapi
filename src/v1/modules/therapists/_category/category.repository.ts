import { AppDataSource } from "../../../../database/sql";
import { CategoryEntity } from "./category.entity";

export const CategoryRepository = AppDataSource.getRepository(CategoryEntity).extend({
  async getPaginated(page: number, perPage: number, skip: number) {
    const totalRecords = await this.count();
    const totalPages = Math.ceil(totalRecords / perPage);
    const data = await this.createQueryBuilder("category")
      .where("category.deleted_at IS NULL")
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
