import { Router, Response } from "express";
import { authCheck, validateRequest } from "./middlewares";
import * as schema from "./validator-schemas";
import { REQUEST_FIELD, HttpStatus } from "../../../enums/";
import { IRequest } from "../../../types/custom";
import * as AuthController from "./auth.controller";

export const authRouter = Router();

authRouter.post(
  "/sign-up",
  validateRequest(REQUEST_FIELD.BODY, schema.SignUpSchema),
  AuthController.signUp,
);

authRouter.post(
  "/sign-in",
  validateRequest(REQUEST_FIELD.BODY, schema.SignInSchema),
  AuthController.signIn,
);

authRouter.get("/me", authCheck, (req: IRequest, res: Response) => {
  return res
    .status(HttpStatus.OK)
    .json({ status: true, message: "Profile retrieved successfully", data: req.user });
});

authRouter.post(
  "/refresh-token",
  validateRequest(REQUEST_FIELD.BODY, schema.RefreshTokenSchema),
  AuthController.getNewAccessToken,
);
