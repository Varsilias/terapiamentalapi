import { User } from "./user/user.model";

export const findUserById = async (userId: string) => {
  const user = await User.findById(userId);
  return user;
};
