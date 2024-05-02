import db from "../db";

export const findUnredeemedKey = async (key: string) => {
	return await db.keys.findFirst({
		where: {
			key,
			redeemedBy: null,
		},
	});
};

export const findKeyOrThrow = async (key: string) => {
	const result = await db.keys.findFirstOrThrow({
		where: {
			key,
		},
	});
	return result;
};

export const redeemKey = async (key: string, username: string) => {
	const foundKey = await findUnredeemedKey(key);

	if (!foundKey?.id) {
		throw new Error("Key not found or already redeemed");
	}

	await db.keys.update({
		where: {
			key: foundKey.key,
			redeemedBy: null,
		},
		data: {
			redeemedBy: username,
		},
	});

	return true;
};
