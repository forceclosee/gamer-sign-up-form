import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { tanstackStartCookies } from "better-auth/tanstack-start/solid";

import { db } from "#/db";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),

	emailAndPassword: {
		enabled: true,
	},

	plugins: [
		username({
			maxUsernameLength: 20,
			usernameValidator: (username) => {
				return /^[a-zA-Z0-9_-]+$/.test(username);
			},
			displayUsername: false,
		}),
		tanstackStartCookies(),
	],
});
