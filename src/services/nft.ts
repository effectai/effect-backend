import { useSession } from "./../session";
import type { NameType } from "@wharfkit/session";

export type MintNftArgs = {
	collectionName: NameType;
	schemaName: NameType;
	templateId: string;
	mintTo: NameType;
};

export const mintNft = async ({
	collectionName,
	schemaName,
	templateId,
	mintTo,
}: MintNftArgs) => {
	try {
		const { transact, authorization, actor } = useSession();

		await transact({
			action: {
				account: "atomicassets",
				name: "mintasset",
				authorization,
				data: {
					authorized_minter: actor,
					collection_name: collectionName,
					schema_name: schemaName,
					template_id: templateId,
					new_asset_owner: mintTo,
					immutable_data: [],
					mutable_data: [],
					tokens_to_back: [],
				},
			},
		});
	} catch (error) {
		console.log("error", error);
		throw error;
	}
};
