import { t } from "elysia";
import { findUnredeemedKey, redeemKey } from "../services/keys";
import { getAssetsForAccount, mintNft } from "../services/atomic";
export const authController = (app) => app.post("/grant-access", async ({ body: { key, username } }) => {
    //step 1. Find the key / check validity.
    const foundKey = await findUnredeemedKey(key);
    if (!foundKey) {
        throw new Error("Key not found or already redeemed");
    }
    // get schema and collection name from env
    const { ATOMIC_ASSETS_SCHEMA_NAME, ATOMIC_ASSETS_COLLECTION_NAME, EARLY_ALPHA_ACCESS_TEMPLATE_ID, } = process.env;
    if (!ATOMIC_ASSETS_SCHEMA_NAME ||
        !ATOMIC_ASSETS_COLLECTION_NAME ||
        !EARLY_ALPHA_ACCESS_TEMPLATE_ID) {
        throw new Error("Missing environment variables");
    }
    //check if user already owns the NFT for early access.
    const assets = await getAssetsForAccount(username);
    if (assets.some((asset) => asset.template_id.toString() === EARLY_ALPHA_ACCESS_TEMPLATE_ID)) {
        throw new Error("User already has access");
    }
    //step 2. mint NFT to the user
    await mintNft({
        collectionName: ATOMIC_ASSETS_COLLECTION_NAME,
        schemaName: ATOMIC_ASSETS_SCHEMA_NAME,
        templateId: EARLY_ALPHA_ACCESS_TEMPLATE_ID,
        mintTo: username,
    });
    //increment redeem count
    await redeemKey(key, username);
    return true;
}, {
    body: t.Object({
        username: t.String(),
        key: t.String(),
    }, { minProperties: 2 }),
});
