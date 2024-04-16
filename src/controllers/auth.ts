import { type Elysia, t } from "elysia";
import { findKey } from "../services/keys";
import { mintNft } from "../services/nft";

export const authController = (app: Elysia) =>
	app.post(
		"/grant-access",
		async ({ body: { key, username } }) => {
			//step 1. Find the key / check validity.
			const accessKey = await findKey(key);

			//step 2. mint NFT to the user
			const result = await mintNft({
				collectionName: "jefftestnft1",
				schemaName: "test",
				templateId: "11420",
				mintTo: username,
			});

			return {
				result,
				accessKey,
			};
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
