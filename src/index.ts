import cors from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { authController } from "./controllers/auth";
import { logger } from "./logger";

const app = new Elysia()
	.onError(({ request, error, body }) => {
		logger.error({ url: request.url, body, message: error.message ?? error });
	})
	.use(swagger())
	.use(cors())
	.use(authController)
	.listen(8888);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
