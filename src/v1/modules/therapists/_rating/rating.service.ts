import { HttpStatus } from "../../../../enums";
import { getTherapist } from "../therapist.service";
import { ICreateRatingDto } from "../types";
import { RatingRepository } from "./rating.repository";

export const createRating = async (payload: ICreateRatingDto) => {
  const { therapist_id, value } = payload;

  const { status, statusCode, message, data } = await getTherapist(therapist_id);

  if (!status || !data) {
    return {
      status,
      statusCode,
      message,
    };
  }

  const entity = RatingRepository.create({ value, therapist: data });
  const rating = await RatingRepository.save(entity);
  return {
    status: true,
    message: "Therapist review created successfully",
    statusCode: HttpStatus.OK,
    data: rating,
  };
};

export const getRatings = async (therapist_id: number) => {
  const { status, statusCode, message, data } = await getTherapist(therapist_id);

  if (!status || !data) {
    return {
      status,
      statusCode,
      message,
    };
  }

  const therapistRatings = await RatingRepository.find({
    where: { therapist: { id: data.id } },
    relations: { therapist: true },
    order: { created_at: "DESC" },
  });

  return {
    status: true,
    message: "Therapist ratings retrieved successfully",
    statusCode: HttpStatus.OK,
    data: therapistRatings,
  };
};

export const getAverageRatings = async (therapist_id: number) => {
  const { status, statusCode, message, data } = await getTherapist(therapist_id);

  if (!status || !data) {
    return {
      status,
      statusCode,
      message,
    };
  }

  const { sumOfRating, totalRating } = await RatingRepository.getAverageRatings(data.id);
  const averageRating = Number(sumOfRating / totalRating).toFixed(2);

  return {
    status: true,
    message: "Therapist average ratings retrieved successfully",
    statusCode: HttpStatus.OK,
    data: averageRating,
  };
};
