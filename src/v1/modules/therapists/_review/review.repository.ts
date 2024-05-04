import { AppDataSource } from "../../../../database/sql";
import { ReviewEntity } from "./review.entity";

export const ReviewRepository = AppDataSource.getRepository(ReviewEntity).extend({});
