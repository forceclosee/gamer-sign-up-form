import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
	throw new Error("database url not found");
}

export default defineConfig({
	out: "./src/db/migrations",
	schema: "./src/db/schema/*",
	dialect: "postgresql",
	dbCredentials: {
		url: databaseUrl,
	},
});
