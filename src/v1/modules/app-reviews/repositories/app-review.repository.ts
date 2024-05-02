import { AppDataSource } from "../../../../database/sql";
import { AppReviewEntity } from "../entities/app-reviews.entity";

export const AppReviewRepository = AppDataSource.getRepository(AppReviewEntity).extend({
  async getPaginated(page: number, perPage: number, skip: number) {
    const totalRecords = await this.count();
    const totalPages = Math.ceil(totalRecords / perPage);
    const data = await this.createQueryBuilder("review")
      .leftJoinAndSelect("review.user", "user")
      .where("review.deleted_at IS NULL")
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
