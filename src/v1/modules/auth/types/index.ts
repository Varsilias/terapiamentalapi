export interface IUser {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  salt?: string;
  emailVerified: boolean;
  password?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date | null;
  comparePassword?: (password: string) => boolean;
}

export interface ISignUpDto {
  username: string;
  lastname: string;
  firstname: string;
  email: string;
  storename: string;
  password: string;
}

export interface ISignInDto {
  email: string;
  password: string;
}

export interface IRefreshTokenDto {
  refresh_token: string;
}
