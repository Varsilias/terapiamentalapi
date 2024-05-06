import { Router } from "express";
import { authRouter } from "./modules/auth/auth.route";
import { onboardingRouter } from "./modules/onboarding/onboarding.route";
import { appReviewRouter } from "./modules/app-reviews/app-review.route";
import { logger } from "../config/logger.config";
import { categoryRouter } from "./modules/therapists/_category/category.route";
import { specialityRouter } from "./modules/therapists/_speciality/speciality.route";
import { therapistRouter } from "./modules/therapists/therapist.route";
import { reviewRouter } from "./modules/therapists/_review/review.route";
import { ratingRouter } from "./modules/therapists/_rating/rating.route";

const router = Router();

router.use((req, res, next) => {
  logger.info(`${process.env.ENV} - ${new Date()} - ${req.originalUrl}`);
  next();
});

router.use("/auth", authRouter);
router.use("/onboarding", onboardingRouter);
router.use("/app-review", appReviewRouter);
router.use("/category", categoryRouter);
router.use("/speciality", specialityRouter);
router.use("/therapist", therapistRouter);
router.use("/review", reviewRouter);
router.use("/rating", ratingRouter);

export const v1Routes = router;
