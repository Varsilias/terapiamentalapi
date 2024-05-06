import { AppDataSource } from "../../../../database/sql";
import { RatingEntity } from "./rating.entity";

const QUERY_BUILDER_NAME = "rating";
export const RatingRepository = AppDataSource.getRepository(RatingEntity).extend({
  async getAverageRatings(
    therapist_id: number,
  ): Promise<{ sumOfRating: number; totalRating: number }> {
    const builder = this.createQueryBuilder(QUERY_BUILDER_NAME);

    const data = await builder
      .where(`rating.therapist.id = :therapist_id`, {
        therapist_id: therapist_id,
      })
      .select("SUM(rating.value)", "sumOfRating")
      .addSelect("COUNT(rating.therapist)", "totalRating")
      .getRawOne();

    return data;
  },
});
