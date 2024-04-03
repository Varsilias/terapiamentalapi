import { Router } from "express";
import { authRouter } from "./modules/auth/auth.route";
import { onboardingRouter } from "./modules/onboarding/onboarding.route";
import { logger } from "../config/logger.config";

const router = Router();

router.use((req, res, next) => {
  logger.info(`${process.env.ENV} - ${new Date()} - ${req.originalUrl}`);
  next();
});

router.use("/auth", authRouter);
router.use("/onboarding", onboardingRouter);

export const v1Routes = router;
