import { IRefreshTokenDto, ISignInDto, ISignUpDto } from "./types";
import { HttpStatus } from "../../../enums";
import { UserRepository } from "./_user/user.repository";
import { UserEntity } from "./_user/user.entity";
import crypto from "crypto";
import * as UtilService from "./utils.service";
import * as JwtService from "./jwt.service";
import { TokenExpiredError, JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { logger } from "../../../config/logger.config";

interface IJwtPayload extends JwtPayload {
  [key: string]: any;
}

export const findUserById = async (id: number) => {
  const user = await UserRepository.findOneBy({ id });
  return user?.sanitize();
};

export const signUp = async (payload: ISignUpDto) => {
  const { email, password } = payload;

  const userExists = await UserRepository.findOne({ where: { email } });

  if (userExists) {
    return { status: false, message: "Email already in use.", statusCode: HttpStatus.BAD_REQUEST };
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = UtilService.hashPassword(password, salt);

  const entity = UserRepository.create({ ...payload, salt, password: hashedPassword });
  const user = (await UserRepository.save(entity)) as UserEntity;

  return {
    status: true,
    message: "Sign up successful",
    data: user.sanitize(),
    statusCode: HttpStatus.OK,
  };
};

export const signIn = async (payload: ISignInDto) => {
  const { email, password } = payload;
  const userExists = await UserRepository.findUserWithPasswordAndSalt(email);

  if (!userExists) {
    return {
      status: false,
      message: "Invalid Credentials.",
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  // TODO: Ensure User Email has been verified
  // TODO: Ensure User Phone number has been verified

  const isMatch = UtilService.comparePassword(password, userExists.salt, userExists.password);

  if (!isMatch) {
    return {
      status: false,
      message: "Invalid Credentials.",
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  const accessToken = JwtService.signAccessToken({
    id: userExists.id,
    public_id: userExists.public_id,
    email: userExists.email,
  });
  const refreshToken = JwtService.signRefreshToken({
    id: userExists.id,
    public_id: userExists.public_id,
    email: userExists.email,
  });

  return {
    status: true,
    message: "Login Successful",
    statusCode: HttpStatus.OK,
    data: {
      token: { access_token: accessToken, refresh_token: refreshToken },
      user: userExists.sanitize(),
    },
  };
};

export const generateNewAccessToken = async (payload: IRefreshTokenDto) => {
  try {
    const decodedUser = JwtService.verifyRefreshToken(payload.refresh_token) as IJwtPayload;
    const tokenPayload = {
      id: decodedUser.id,
      email: decodedUser.email,
      public_id: decodedUser.public_id,
    };
    const accessToken = JwtService.signAccessToken(tokenPayload);
    const refreshToken = JwtService.signRefreshToken(tokenPayload);
    return {
      status: true,
      message: "Token retrieved successfully",
      statusCode: HttpStatus.CREATED,
      data: { access_token: accessToken, refresh_token: refreshToken },
    };
  } catch (error: any) {
    logger.error(`${error?.message}`);

    if (error instanceof TokenExpiredError) {
      return {
        status: false,
        message: "Refresh Token Expired",
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
    if (error instanceof JsonWebTokenError) {
      return {
        status: false,
        message: "Invalid or malfunctioned Refresh token",
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
    return {
      status: false,
      message: "could not resolve request",
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
};
