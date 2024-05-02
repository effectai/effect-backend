// seed some access keys for development
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const keys = ["test-1234", "test-5678"];

const createKeys = async () => {
	try {
		await prisma.keys.create({
			data: {
				key: keys[0],
			},
		});
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
