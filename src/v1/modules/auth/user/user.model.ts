import mongoose from "mongoose";
import { IUser } from "../types";
import crypto from "crypto";
import { hashPassword, comparePassword } from "../utils.service";
import { logger } from "../../../../config/logger.config";

const UserSchema = new mongoose.Schema<IUser>(
  {
    firstname: {
      type: String,
      nullable: false,
    },
    lastname: {
      type: String,
      nullable: false,
    },
    username: {
      type: String,
      nullable: false,
    },
    email: {
      type: String,
      nullable: false,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    deletedAt: {
      type: Date,
      nullable: true,
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.salt = crypto.randomBytes(16).toString("hex");
    const enteredPassword = this.password;
    this.password = hashPassword(enteredPassword!, this.salt);
    return next();
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (password: string) {
  try {
    return comparePassword(password, this.salt, this.password);
  } catch (e) {
    logger.error("[TerapiaMental Core] - [auth.user.schema.comparePassword] --> " + e);
    return false;
  }
};

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.salt;

  return userObject;
};

export const User = mongoose.model("User", UserSchema);
