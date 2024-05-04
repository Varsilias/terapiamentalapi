import { HttpStatus } from "../../../../enums";
import { ICreateReviewDto } from "../types";
import { ReviewRepository } from "./review.repository";
import { getTherapist } from "../therapist.service";

export const createNewReview = async (payload: ICreateReviewDto) => {
  const { location, review, user_id, therapist_id } = payload;

  const { status, statusCode, message, data } = await getTherapist(therapist_id);

  if (!status || !data) {
    return {
      status,
      statusCode,
      message,
    };
  }
  const entity = ReviewRepository.create({
    location,
    review,
    user: { id: user_id },
    therapist: data,
  });
  const therapistReview = await ReviewRepository.save(entity);
  return {
    status: true,
    message: "Therapist review created successfully",
    statusCode: HttpStatus.OK,
    data: therapistReview,
  };
};

export const getReviews = async (therapist_id: number) => {
  const { status, statusCode, message, data } = await getTherapist(therapist_id);

  if (!status || !data) {
    return {
      status,
      statusCode,
      message,
    };
  }

  const therapistReviews = await ReviewRepository.find({
    where: { therapist: { id: data.id } },
    relations: { therapist: true },
    order: { created_at: "DESC" },
  });

  return {
    status: true,
    message: "Therapist reviews retrieved successfully",
    statusCode: HttpStatus.OK,
    data: therapistReviews,
  };
};
