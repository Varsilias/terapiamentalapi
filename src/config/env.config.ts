import { z } from "zod";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { AppException } from "../exceptions";
import { AppStatus } from "../enums";

const envConfigSchema = z.object({
  PORT: z.string().default("3200"),
  ENV: z.union([
    z.literal("development"),
    z.literal("staging"),
    z.literal("test"),
    z.literal("production"),
  ]),
});

interface IEnvConfig {
  [prop: string]: string;
  PORT: string;
  ENV: "development" | "staging" | "test" | "production";
}

export class EnvConfig {
  private readonly config: IEnvConfig;

  constructor() {
    const config = EnvConfig.parseEnvFile();
    this.config = EnvConfig.validateEnvConfig(config);
  }

  private static parseEnvFile() {
    const envFile = process.env.ENV
      ? `${process.cwd()}/.env.${process.env.ENV}`
      : `${process.cwd()}/.env`;

    return dotenv.parse(fs.readFileSync(envFile));
  }

  private static validateEnvConfig(envConfig: dotenv.DotenvParseOutput) {
    const parsedResult = envConfigSchema.safeParse(envConfig);

    if (!parsedResult.success) {
      throw new AppException(
        AppStatus.CONFIGURATION_ERROR,
        `Invalid Configuration from Env File: ${parsedResult.error.message}`,
      );
    }
    return parsedResult.data;
  }

  get(key: string): string {
    return this.config[key];
  }

  get inProduction(): boolean {
    return this.config.ENV === "production";
  }

  get PORT(): number {
    return parseInt(this.config.PORT || "3200", 10);
  }
}
