import mongoose from "mongoose";
import { logger } from "../config/logger.config";

export function connect(mongoURI: string) {
  console.log(mongoURI);

  mongoose
    .connect(mongoURI)
    .then(() => {
      logger.info("[TerapiaMental DB] --> connected to DB");
    })
    .catch((error) => {
      logger.error(`[TerapiaMental DB] --> [DB Connection Error] --> ${error.message}`);
    });
}
