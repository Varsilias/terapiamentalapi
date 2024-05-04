import { HttpStatus } from "../../../../enums";
import { CategoryRepository } from "./category.repository";
import { ICreateCategoryDto, IGetAllCatgeoriesDto } from "../types";

export const createCategory = async (payload: ICreateCategoryDto) => {
  const { name } = payload;
  const categoryExists = await CategoryRepository.findOne({ where: { name } });

  if (categoryExists) {
    return {
      status: false,
      statusCode: HttpStatus.CONFLICT,
      message: "Category with name already exists",
    };
  }
  const entity = CategoryRepository.create({ ...payload });
  const category = await CategoryRepository.save(entity);

  return {
    status: true,
    statusCode: HttpStatus.CREATED,
    message: "Category created successfully",
    data: category,
  };
};

export const getCatgeories = async (payload: IGetAllCatgeoriesDto) => {
  let { page, perPage } = payload;

  page = page * 1 || 1;
  perPage = perPage * 1 || 10;

  const skip = (page - 1) * perPage;

  const categories = await CategoryRepository.getPaginated(page, perPage, skip);
  return {
    status: true,
    message: "Categories retrieved successfully",
    statusCode: HttpStatus.OK,
    data: categories,
  };
};
