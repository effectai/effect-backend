// seed some access keys for development
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateRandomKeys = (amount: number, length: number) => {

	const keys = [];
	const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < amount; i++) {
		let key = "";
		for (let j = 0; j < length; j++) {
			key += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		keys.push(key);
	}

	return keys;
}


const createKeys = async () => {
	try {

		console.log("Generating keys...");

		const keys = generateRandomKeys(10, 8);

		await prisma.keys.createMany({
			data: keys.map((key) => {
				return {
					key: key
				}
			})
		})

		console.log("generated keys: ", keys.join("\n"));
	} catch (e) {
		console.error(e);
	}
};

try {
	await createKeys();
} catch (error) {
	console.error(error);
	await prisma.$disconnect();
	process.exit(1);
}
