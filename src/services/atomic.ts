import { RpcApi } from "atomicassets";
import { useSession } from "../session";
import type { NameType } from "@wharfkit/session";

export type MintNftArgs = {
	collectionName: NameType;
	schemaName: NameType;
	templateId: string;
	mintTo: NameType;
};

export const getTemplates = async (collectionName: string) => {
	const rpc = new RpcApi("https://jungle4.cryptolions.io:443", "atomicassets");
	const data = await rpc.getCollectionTemplates(collectionName);
	return data;
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
) => {
	const { transact, authorization } = useSession();

	await transact({
		action: {
			account: "atomicassets",
			name: "createschema",
			authorization,
			data: {
				authorized_creator: "eoseoseoseos",
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
