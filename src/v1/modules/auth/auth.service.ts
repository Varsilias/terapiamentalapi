import { IRefreshTokenDto, ISignInDto, ISignUpDto, IUser } from "./types";
import { User } from "./user/user.model";
import { HttpStatus } from "../../../enums";
import * as JwtService from "./jwt.service";
import { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { logger } from "../../../config/logger.config";

interface IJwtPayload extends JwtPayload {
  [key: string]: any;
}

export const findUserById = async (userId: string) => {
  const user = await User.findById(userId);
  return user;
};

export const signUp = async (payload: ISignUpDto) => {
  const { email, ...rest } = payload;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return { status: false, message: "Email already in use.", statusCode: HttpStatus.BAD_REQUEST };
  }

  const user = (await new User({ email, ...rest }).save()) as IUser;
  return {
    status: true,
    message: "Sign up successful",
    data: user,
    statusCode: HttpStatus.OK,
  };
};

export const signIn = async (payload: ISignInDto) => {
  const userExists = (await User.findOne({ email: payload.email }).select(
    "+password +salt",
  )) as IUser;

  if (!userExists) {
    return {
      status: false,
      message: "Invalid Credentials.",
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  // TODO: Ensure User Email has been verified

  const isMatch = userExists.comparePassword!(payload.password);

  if (!isMatch) {
    return {
      status: false,
      message: "Invalid Credentials.",
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  const accessToken = JwtService.signAccessToken({ _id: userExists._id, email: userExists.email });
  const refreshToken = JwtService.signRefreshToken({
    _id: userExists._id,
    email: userExists.email,
  });

  return {
    status: true,
    message: "Login Successful",
    statusCode: HttpStatus.OK,
    data: { token: { accessToken, refreshToken }, user: userExists },
  };
};

export const generateNewAccessToken = async (payload: IRefreshTokenDto) => {
  try {
    const decodedUser = JwtService.verifyRefreshToken(payload.refresh_token) as IJwtPayload;
    const tokenPayload = {
      _id: decodedUser._id,
      email: decodedUser.email,
    };
    const accessToken = JwtService.signAccessToken(tokenPayload);
    const refreshToken = JwtService.signRefreshToken(tokenPayload);
    return {
      status: true,
      message: "Token retrieved successfully",
      statusCode: HttpStatus.CREATED,
      data: { accessToken, refreshToken },
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
