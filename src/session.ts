import { Session } from "@wharfkit/session";
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";

const eos_mainnet = {
	id: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
	url: "https://eos.greymass.com",
};

const jungle4 = {
	id: "73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d",
	url: "https://jungle4.cryptolions.io",
};

export const useSession = () => {
	const privateKey = process.env.EOS_PRIVATE_KEY;
	const actor = process.env.EOS_ACTOR;
	const permission = process.env.EOS_PERMISSION;

	if (!privateKey) {
		throw new Error("PRIVATE_KEY is not set, please set it in the .env file.");
	}

	if (!actor) {
		throw new Error("ACTOR is not set, please set it in the .env file.");
	}

	if (!permission) {
		throw new Error("PERMISSION is not set, please set it in the .env file.");
	}

	const session = new Session(
		{
			actor,
			permission,
			chain: jungle4,
			walletPlugin: new WalletPluginPrivateKey(privateKey),
		},
		{
			fetch,
		},
	);

	return {
		...session,
		actor: session.actor,
		authorization: [
			{
				actor: session.actor,
				permission: session.permission,
			},
		],
		transact: session.transact.bind(session),
	};
};
