import { EnvConfig } from "../../../config/env.config";
import jwt from "jsonwebtoken";

const config = new EnvConfig();

export const signAccessToken = (
  payload: { id: number; public_id: string; email: string },
  expiry?: string | number,
) => {
  return jwt.sign(payload, config.JWT_ACCESS_TOKEN_SECRET, { expiresIn: expiry ?? "1h" });
};

// The Calling function will handle errors that arises
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.JWT_ACCESS_TOKEN_SECRET);
};

export const signRefreshToken = (
  payload: { id: number; public_id: string; email: string },
  expiry?: string | number,
) => {
  return jwt.sign(payload, config.JWT_REFRESH_TOKEN_SECRET, { expiresIn: expiry ?? "14d" });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.JWT_REFRESH_TOKEN_SECRET);
};
