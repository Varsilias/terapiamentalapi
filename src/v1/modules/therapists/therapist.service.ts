import { logger } from "../../../config/logger.config";
import { AppDataSource } from "../../../database/sql";
import { HttpStatus } from "../../../enums";
import { SpecialityEntity } from "./_speciality/specialities.entity";
import { CategoryRepository } from "./_category/category.repository";
import { SpecialityRepository } from "./_speciality/speciality.repository";
import { TherapistRepository } from "./therapist.repository";
import { ICreateTherapistDto, IUpdateTherapistDto } from "./types";

export const createTherapist = async (payload: ICreateTherapistDto) => {
  const { email, category_id, specialties } = payload;

  const therapistExists = await TherapistRepository.findOne({ where: { email } });

  if (therapistExists) {
    return {
      status: false,
      statusCode: HttpStatus.CONFLICT,
      message: "Therapists already exists",
    };
  }

  const category = await CategoryRepository.findOne({ where: { id: category_id } });

  if (!category) {
    return {
      status: false,
      statusCode: HttpStatus.BAD_REQUEST,
      message: "Chosen category does not exists",
    };
  }

  const specialityEntities = await SpecialityRepository.findSpecialitiesById(specialties);

  if (specialityEntities.length !== specialties.length) {
    return {
      status: false,
      statusCode: HttpStatus.BAD_REQUEST,
      message: "One or more chosen speciality was not found",
    };
  }

  const entity = TherapistRepository.create({
    ...payload,
    category,
    specialities: specialityEntities,
  });

  const data = await TherapistRepository.save(entity);
  return {
    status: true,
    statusCode: HttpStatus.OK,
    message: "Therapist created successfully",
    data,
  };
};
export const getTherapists = async () => {
  const therapists = await TherapistRepository.getAll();
  return {
    status: true,
    message: "Therapists retrieved successfully",
    statusCode: HttpStatus.OK,
    data: therapists,
  };
};
export const getTherapist = async (id: any) => {
  const therapist = await TherapistRepository.findOne({
    where: { id },
    relations: {
      category: true,
      specialities: true,
    },
  });

  if (!therapist) {
    return {
      status: false,
      message: "Therapists not found",
      statusCode: HttpStatus.NOT_FOUND,
    };
  }

  return {
    status: true,
    message: "Therapist retrieved successfully",
    statusCode: HttpStatus.OK,
    data: therapist,
  };
};
export const updateTherapist = async (payload: IUpdateTherapistDto) => {
  const {
    id,
    specialties,
    bio,
    charges_per_hour,
    experience,
    firstname,
    lastname,
    location,
    profile_image,
  } = payload;
  const { status, statusCode, message, data } = await getTherapist(id);

  if (!status || !data) {
    return {
      status,
      statusCode,
      message,
    };
  }

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    let specialityEntities: SpecialityEntity[] = [];

    if (specialties) {
      specialityEntities = await SpecialityRepository.findSpecialitiesById(specialties);

      if (specialityEntities.length !== specialties.length) {
        return {
          status: false,
          statusCode: HttpStatus.BAD_REQUEST,
          message: "One or more chosen speciality was not found",
        };
      }
    }

    const updatePayload = await TherapistRepository.update(data.id, {
      bio,
      charges_per_hour,
      experience,
      firstname,
      lastname,
      location,
      profile_image,
    });
    await queryRunner.commitTransaction();

    if (!updatePayload.affected || updatePayload.affected <= 0) {
      return {
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Something went wrong, Unable to update resource",
      };
    }

    const { data: updatedData } = await getTherapist(id);
    const specialities = updatedData?.specialities as SpecialityEntity[];

    const therapist = await TherapistRepository.save({
      ...updatedData,
      specialities: [...specialities, ...specialityEntities],
    });

    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: "Therapist updated successfully",
      data: therapist,
    };
  } catch (error: any) {
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [therapist.service.updateTherapist]: ${error.message}`,
    );
    await queryRunner.rollbackTransaction();
    return {
      status: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Something went wrong, we are fixing it",
    };
  } finally {
    await queryRunner.release();
  }
};
export const deleteTherapist = async (id: any) => {
  const { status, statusCode, message, data } = await getTherapist(id);

  if (!status || !data) {
    return {
      status,
      message,
      statusCode,
    };
  }

  const deletedPayload = await TherapistRepository.delete(id);

  if (!deletedPayload.affected || deletedPayload.affected <= 0) {
    return {
      status: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Something went wrong, Unable to delete resource",
    };
  }

  return {
    status: true,
    statusCode: HttpStatus.OK,
    message: "Therapist deleted successfully",
    data,
  };
};
