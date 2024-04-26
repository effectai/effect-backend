import { type Elysia, t } from "elysia";
import { findKeyOrThrow } from "../services/keys";
import { mintNft } from "../services/atomic";

export const authController = (app: Elysia) =>
	app.post(
		"/grant-access",
		async ({ body: { key, username } }): Promise<boolean> => {
			//step 1. Find the key / check validity.
			await findKeyOrThrow(key);

			if (!process.env.EARLY_ALPHA_ACCESS_NFT_ID) {
				throw new Error("EARLY_ALPHA_ACCESS_NFT_ID not set");
			}

			//step 2. mint NFT to the user
			await mintNft({
				collectionName: "jefftestcoll",
				schemaName: "schema1",
				templateId: process.env.EARLY_ALPHA_ACCESS_NFT_ID,
				mintTo: username,
			});

			return true;
		},
		{
			body: t.Object(
				{
					username: t.String(),
					key: t.String(),
				},
				{ minProperties: 2 },
			),
		},
	);
