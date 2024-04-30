import { APIClient } from "@wharfkit/antelope";
export const client = new APIClient({
    url: process.env.RPC_API_URL,
});
