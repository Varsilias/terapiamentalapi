import { HttpStatus } from "../../../../enums";
import { SpecialityRepository } from "./speciality.repository";
import { ICreateCategoryDto, IGetAllCatgeoriesDto } from "../types";

export const createSpeciality = async (payload: ICreateCategoryDto) => {
  const { name } = payload;
  const specialityExists = await SpecialityRepository.findOne({ where: { name } });

  if (specialityExists) {
    return {
      status: false,
      statusCode: HttpStatus.CONFLICT,
      message: "Speciality with name already exists",
    };
  }
  const entity = SpecialityRepository.create({ ...payload });
  const speciality = await SpecialityRepository.save(entity);

  return {
    status: true,
    statusCode: HttpStatus.CREATED,
    message: "Speciality created successfully",
    data: speciality,
  };
};

export const getSpecialities = async (payload: IGetAllCatgeoriesDto) => {
  let { page, perPage } = payload;

  page = page * 1 || 1;
  perPage = perPage * 1 || 10;

  const skip = (page - 1) * perPage;

  const specialities = await SpecialityRepository.getPaginated(page, perPage, skip);
  return {
    status: true,
    message: "Specialities retrieved successfully",
    statusCode: HttpStatus.OK,
    data: specialities,
  };
};
