import { AppDataSource } from "../../../../database/sql";
import { UserEntity } from "./user.entity";

export const UserRepository = AppDataSource.getRepository(UserEntity).extend({
  async findUserWithPasswordAndSalt(email: string) {
    const user = this.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .addSelect("user.password")
      .addSelect("user.salt")
      .getOne();
    return user;
  },
});
