import db from "../db";

export const findKeyOrThrow = async (key: string) => {
	const result = await db.keys.findFirstOrThrow({
		where: {
			key,
		},
	});

	return result;
};
