export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  salt?: string;
  emailVerified: boolean;
  password?: string;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date | null;
  comparePassword?: (password: string) => boolean;
}

export interface ISignUpDto {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  phone_number: string;
  date_of_birth: Date | string;
  gender: GenderEnum;
}

export interface ISignInDto {
  email: string;
  password: string;
}

export interface IRefreshTokenDto {
  refresh_token: string;
}

export enum GenderEnum {
  MALE = "Male",
  FEMALE = "Female",
}
