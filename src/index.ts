import { Elysia } from "elysia";
import { authController } from "./controllers/auth";
import { swagger } from "@elysiajs/swagger";
import cors from "@elysiajs/cors";

const app = new Elysia()
	.use(swagger())
	.use(cors())
	.use(authController)
	.listen(8888);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
