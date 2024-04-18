import { RpcApi } from "atomicassets";
import { useSession } from "../session";
import type { NameType } from "@wharfkit/session";

export type MintNftArgs = {
	collectionName: NameType;
	schemaName: NameType;
	templateId: string;
	mintTo: NameType;
};

export const getTemplates = async () => {
	const rpc = new RpcApi("https://jungle4.cryptolions.io:443", "atomicassets");
	const data = await rpc.getCollectionTemplates("jefftestcoll");
	return data;
};

export const authorizeCreator = async () => {
	const { transact, authorization, actor } = useSession();

	await transact({
		action: {
			account: "atomicassets",
			name: "addcolauth",
			authorization: [
				{
					actor: "eoseoseoseos",
					permission: "active",
				},
			],
			data: {
				collection_name: "jefftestcoll",
				account_to_add: "eoseoseoseos",
			},
		},
	});
};

export const createTemplate = async () => {
	const { transact, authorization, actor } = useSession();

	await transact({
		action: {
			account: "atomicassets",
			name: "createtempl",
			authorization: [
				{
					actor: "eoseoseoseos",
					permission: "active",
				},
			],
			data: {
				authorized_creator: "eoseoseoseos",
				collection_name: "jefftestcoll",
				schema_name: "schema1",
				transferable: false,
				burnable: true,
				max_supply: 0,
				immutable_data: [],
			},
		},
	});
};

export const createSchema = async () => {
	const { transact, authorization, actor } = useSession();

	await transact({
		action: {
			account: "atomicassets",
			name: "createschema",
			authorization: [
				{
					actor: "eoseoseoseos",
					permission: "active",
				},
			],
			data: {
				authorized_creator: "eoseoseoseos",
				collection_name: "jefftestcoll",
				schema_name: "schema1",
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

export const getAssets = async () => {
	const rpc = new RpcApi("https://jungle4.cryptolions.io:443", "atomicassets");
	const result = await rpc.getAccountAssets("eoseoseoseos");
};

export const createCollection = async () => {
	const { transact, authorization, actor } = useSession();

	await transact({
		action: {
			account: "atomicassets",
			name: "createcol",
			authorization: [
				{
					actor: "eoseoseoseos",
					permission: "active",
				},
			],
			data: {
				author: "eoseoseoseos",
				collection_name: "jefftestcoll",
				allow_notify: false,
				authorized_accounts: ["eoseoseoseos"],
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
