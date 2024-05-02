import { IAppReviewDto, IGetAllAppReviewsDto } from "./types";
import { AppReviewRepository } from "./repositories/app-review.repository";
import { HttpStatus } from "../../../enums";

export const createNewAppReview = async (payload: IAppReviewDto) => {
  const { location, review, user_id } = payload;
  const entity = AppReviewRepository.create({ location, review, user: { id: user_id } });
  const appReview = await AppReviewRepository.save(entity);
  return {
    status: true,
    message: "App review created successfully",
    statusCode: HttpStatus.OK,
    data: appReview,
  };
};

export const getAppReviews = async (payload: IGetAllAppReviewsDto) => {
  let { page, perPage } = payload;

  page = page * 1 || 1;
  perPage = perPage * 1 || 10;

  const skip = (page - 1) * perPage;

  const reviews = await AppReviewRepository.getPaginated(page, perPage, skip);
  return {
    status: true,
    message: "Reviews retrieved successfully",
    statusCode: HttpStatus.OK,
    data: reviews,
  };
};
