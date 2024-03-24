import { Router } from "express";
import { authRouter } from "./auth/auth.route";
import { storeRouter } from "./store/store.route";
import { logger } from "../../config/logger.config";

const router = Router();

router.use((req, res, next) => {
  logger.info(`${process.env.ENV} - ${new Date()} - ${req.originalUrl}`);
  next();
});

router.use("/auth", authRouter);
router.use("/store", storeRouter);

export const v1Routes = router;
