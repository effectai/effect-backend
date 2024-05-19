import { type Elysia, t } from "elysia";

export const generalController = (app: Elysia) =>
	app.get("/health", async () => {
		return "ok";
	});
