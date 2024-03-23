import { Router, Response } from "express";
import { authCheck, validateRequest } from "./middlewares";
import * as schema from "./validator-schemas";
import { REQUEST_FIELD, HttpStatus } from "../../../enums/";
import { IRequest } from "../../../types/custom";

export const authRouter = Router();

authRouter.post(
  "/sign-up",
  validateRequest(REQUEST_FIELD.BODY, schema.SignUpSchema),
  (req, res) => {
    return res.status(HttpStatus.OK).json({ message: "You have reached sign-up route" });
  },
);

authRouter.post(
  "/sign-in",
  validateRequest(REQUEST_FIELD.BODY, schema.SignInSchema),
  (req, res) => {
    return res.status(HttpStatus.OK).json({ message: "You have reached sign-in route" });
  },
);

authRouter.get("/me", authCheck, (req: IRequest, res: Response) => {
  return res
    .status(HttpStatus.OK)
    .json({ status: true, message: "Profile retrieved successfully", data: req.user });
});

authRouter.post(
  "/refresh-token",
  // validateRequest(REQUEST_FIELD.BODY, schema.RefreshTokenSchema),
  (req, res) => {
    return res.status(200).json({ message: "You have reached refresh token route" });
  },
);
