import { useSession } from "../session";
import { client } from "../client";
import { logger } from "../logger";
export const getAssetsForAccount = async (accountName) => {
    const { rows } = await client.v1.chain.get_table_rows({
        code: "atomicassets",
        scope: accountName,
        table: "assets",
        limit: 3,
    });
    return rows;
};
export const authorizeCreator = async (collectionName, creatorName) => {
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
export const createTemplate = async (collectionName, schemaName) => {
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
export const createSchema = async (collectionName, schemaName, authorizedCreator) => {
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
export const createCollection = async (collectionName) => {
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
export const mintNft = async ({ collectionName, schemaName, templateId, mintTo, }) => {
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
    }
    catch (error) {
        console.log("error", error);
        throw error;
    }
};
