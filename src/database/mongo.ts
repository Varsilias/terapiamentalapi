import mongoose from "mongoose";
import { logger } from "../config/logger.config";

export function connect(mongoURI: string) {
  console.log(mongoURI);

  mongoose
    .connect(mongoURI)
    .then(() => {
      logger.info("[Mainstack DB] --> connected to DB");
    })
    .catch((error) => {
      logger.error(`[Mainstack DB] --> [DB Connection Error] --> ${error.message}`);
    });
}
