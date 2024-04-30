import { ElysiaLogging, LogFormat } from "@otherguy/elysia-logging";
import pino from "pino";
export const logger = pino();
export const elysiaLogger = ElysiaLogging(logger, {
    format: LogFormat.JSON,
});
