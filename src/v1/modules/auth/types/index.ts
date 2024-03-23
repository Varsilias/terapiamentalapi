export interface IUser {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  salt: string;
  emailVerified: boolean;
  password: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date;
}
