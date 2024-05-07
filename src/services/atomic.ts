import type { NameType } from "@wharfkit/session";
import { client } from "../client";
import { logger } from "../logger";
import { useSession } from "../session";

export interface IAssetRow {
	asset_id: string;
	collection_name: string;
	schema_name: string;
	template_id: number;
	ram_payer: string;
	backed_tokens: string[];
	immutable_serialized_data: Uint8Array;
	mutable_serialized_data: Uint8Array;
}

export const getAssetsForAccount = async (
	accountName: string,
): Promise<IAssetRow[]> => {
	const { rows } = await client.v1.chain.get_table_rows({
		code: "atomicassets",
		scope: accountName,
		table: "assets",
		limit: 3,
	});

	return rows;
};

export const authorizeCreator = async (
	collectionName: string,
	creatorName: string,
) => {
	const { transact, authorization, actor } = useSession();

	await transact({
		action: {
			account: "atomicassets",
			name: "addcolauth",
			authorization,
			data: {
				collection_name: collectionName,
				account_to_add: creatorName,
			},
		},
	});
};

export const createTemplate = async (
	collectionName: string,
	schemaName: string,
) => {
	const { transact, authorization } = useSession();

	await transact({
		action: {
			account: "atomicassets",
			name: "createtempl",
			authorization,
			data: {
				authorized_creator: "eoseoseoseos",
				collection_name: collectionName,
				schema_name: schemaName,
				transferable: false,
				burnable: true,
				max_supply: 0,
				immutable_data: [],
			},
		},
	});
};

export const createSchema = async (
	collectionName: string,
	schemaName: string,
	authorizedCreator: string,
) => {
	const { transact, authorization } = useSession();

	await transact({
		action: {
			account: "atomicassets",
			name: "createschema",
			authorization,
			data: {
				authorized_creator: authorizedCreator,
				collection_name: collectionName,
				schema_name: schemaName,
				schema_format: [
					{
						name: "name",
						type: "string",
					},
					{
						name: "img",
						type: "image",
					},
				],
			},
		},
	});
};

export const createCollection = async (collectionName: string) => {
	const { transact, authorization, actor } = useSession();

	await transact({
		action: {
			account: "atomicassets",
			name: "createcol",
			authorization,
			data: {
				author: actor,
				collection_name: collectionName,
				allow_notify: false,
				authorized_accounts: [actor],
				notify_accounts: [],
				market_fee: 0,
				data: [],
			},
		},
	});
};

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
		logger.info("minting nft", collectionName, schemaName, templateId, mintTo);

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
