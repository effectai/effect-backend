// seed some access keys for development
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
	console.log("Seeding database...");
}

try {
	await seed();
} catch (error) {
	console.error(error);
	await prisma.$disconnect();
	process.exit(1);
}
