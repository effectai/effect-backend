import { type Elysia, t } from "elysia";
import {
	createCollection,
	createSchema,
	authorizeCreator,
	createTemplate,
	getTemplates,
} from "../services/atomic";

export const atomicController = (app: Elysia) =>
	app
		.get("/create-collection", async () => {
			//step 1. Find the key / check validity.
			return createCollection();
		})
		.get("/create-schema", async () => {
			return createSchema();
		})
		.get("/create-template", async () => {
			return createTemplate();
		})
		.get("/authorize", () => {
			return authorizeCreator();
		})
		.get("templates", async () => {
			const templates = await getTemplates();

			return templates.map((templates) => ({
				name: templates.collection,
				id: templates.id,
			}));
		});
