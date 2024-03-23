import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logRotateTransport = new DailyRotateFile({
  filename: "./logs/application-%DATE%.log",
  datePattern: "DD-MM-yyyy",
});

const format = winston.format;

const prettyJson = format.printf((info) => {
  if (info.message?.constructor === Object) {
    info.message = JSON.stringify(info.message, null, 4);
  }
  return `${info.level}: ${info.message} - ${info.timestamp}`;
});

export const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  //   level: "info",
  transports: [new winston.transports.Console(), logRotateTransport],
  format: format.combine(
    format.colorize({ all: true }),
    format.prettyPrint(),
    format.timestamp(),
    format.splat(),
    format.simple(),
    prettyJson,
  ),
});
