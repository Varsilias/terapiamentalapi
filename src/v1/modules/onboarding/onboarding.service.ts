import { logger } from "../../../config/logger.config";
import { AppDataSource } from "../../../database/sql";
import { HttpStatus } from "../../../enums";
import { UserEntity } from "../auth/user/user.entity";
import { UserRepository } from "../auth/user/user.repository";
import { OptionRepository } from "./repositories/option.repository";
import { StepRepository } from "./repositories/step.repository";
import { UserChoiceRepository } from "./repositories/user-choice.repository";
import {
  ICreateStepOptionsDto,
  IDeleteStepOptionDto,
  IGetAllStepsDto,
  IOnBoardDto,
  IUpdateStepOptionsDto,
} from "./types";

const getStep = async (step_id: number) => {
  const stepExists = await StepRepository.findOne({ where: { id: step_id } });

  if (!stepExists) {
    return {
      status: false,
      message: "Step not found",
      statusCode: HttpStatus.NOT_FOUND,
    };
  }

  return {
    status: true,
    message: "Step found",
    statusCode: HttpStatus.OK,
    data: stepExists,
  };
};

const getOption = async (option_id: number) => {
  const optionExists = await OptionRepository.findOne({ where: { id: option_id } });

  if (!optionExists) {
    return {
      status: false,
      message: "Option not found",
      statusCode: HttpStatus.NOT_FOUND,
    };
  }

  return {
    status: true,
    message: "Step found",
    statusCode: HttpStatus.OK,
    data: optionExists,
  };
};

export const getOnboardingSteps = async (payload: IGetAllStepsDto) => {
  let { page, perPage } = payload;
  console.log(page, perPage);

  page = page * 1 || 1;
  perPage = perPage * 1 || 10;

  const skip = (page - 1) * perPage;

  const steps = await StepRepository.getPaginated(page, perPage, skip);
  return {
    status: true,
    message: "Steps retrieved successfully",
    statusCode: HttpStatus.OK,
    data: steps,
  };
};

export const createOnboardingStep = async (payload: ICreateStepOptionsDto) => {
  const { name, description, options } = payload;

  const stepExists = await StepRepository.findOne({ where: { name } });

  if (stepExists) {
    return {
      status: false,
      message: "Step already exists",
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();
    const entity = StepRepository.create({ name, description });
    const step = await StepRepository.save(entity);

    const result = await Promise.all(
      options.map(async ({ name, description }) => {
        const entity = OptionRepository.create({ name, description, step });
        const option = await OptionRepository.save(entity);
        return option;
      }),
    );

    await queryRunner.commitTransaction();

    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: "Step created successfully",
      data: { step, options: result },
    };
  } catch (error: any) {
    await queryRunner.rollbackTransaction();
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [onboarding.service.createOnboardingStep]: ${error.message}`,
    );
    return {
      status: false,
      message: "An error occurred when creating step",
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  } finally {
    await queryRunner.release();
  }
};

export const updateOnboardingStep = async (payload: IUpdateStepOptionsDto) => {
  const { step_id, options } = payload;

  const { status, statusCode, message, data } = await getStep(step_id);

  if (!status) {
    return {
      status,
      message,
      statusCode,
    };
  }

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    const result = await Promise.all(
      options.map(async ({ name, description }) => {
        const entity = OptionRepository.create({ name, description, step: data });
        const option = await OptionRepository.save(entity);
        return option;
      }),
    );

    await queryRunner.commitTransaction();

    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: "Options created successfully",
      data: result,
    };
  } catch (error: any) {
    await queryRunner.rollbackTransaction();
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [onboarding.service.updateOnboardingStep]: ${error.message}`,
    );
    return {
      status: false,
      message: "An error occurred when updating step",
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  } finally {
    await queryRunner.release();
  }
};

export const deleteOnboardingStepOption = async (payload: IDeleteStepOptionDto) => {
  const { step_id, option_id } = payload;

  const {
    status: stepStatus,
    message: stepMessage,
    statusCode: stepStatusCode,
    data: step,
  } = await getStep(step_id);

  if (!stepStatus) {
    return {
      status: stepStatus,
      message: stepMessage,
      statusCode: stepStatusCode,
    };
  }
  const {
    status: optionStatus,
    message: optionMessage,
    statusCode: optionStatusCode,
  } = await getOption(option_id);

  if (!optionStatus) {
    return {
      status: optionStatus,
      message: optionMessage,
      statusCode: optionStatusCode,
    };
  }

  const result = await StepRepository.delete({ id: step?.id });

  if (result.affected && result.affected <= 0) {
    return {
      status: false,
      message: "Unable to delete steo and options",
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  }

  return {
    status: true,
    message: "Step deleted succesfully",
    statusCode: HttpStatus.OK,
    data: step,
  };
};

export const onBoard = async (payload: IOnBoardDto) => {
  const { options, step_id, custom_option, user_id } = payload;
  const { message, status, statusCode } = await getStep(step_id);
  const user = { id: user_id } as UserEntity;

  if (!status) {
    return {
      status,
      message,
      statusCode,
    };
  }

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    const result = await Promise.all(
      options.map(async (option_id) => {
        const { status, data: option } = await getOption(option_id);

        if (!status) {
          throw new Error("Option not found");
        }
        const entity = UserChoiceRepository.create({
          option,
          custom_option,
          user,
        });

        const userChoice = await UserChoiceRepository.save(entity);
        return userChoice;
      }),
    );

    const isDone = step_id >= 7; // Seven step onboarding process, there are better ways to do this but this will suffice
    UserRepository.update({ id: user_id }, { onboarding_done: isDone });

    await queryRunner.commitTransaction();

    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: "User choice created successfully",
      data: result,
    };
  } catch (error: any) {
    await queryRunner.rollbackTransaction();
    logger.error(
      `[TerapiaMentalException] - [ExceptionHandler] - [onboarding.service.onBoard]: ${error.message}`,
    );
    return {
      status: false,
      message: "An error occurred when onboarding",
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  } finally {
    await queryRunner.release();
  }
};
