import db from "../db";

export const findKey = async (key: string) => {
	const result = await db.keys.findFirstOrThrow({
		where: {
			key,
		},
	});

	return result;
};
