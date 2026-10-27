import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { tanstackStartCookies } from "better-auth/tanstack-start/solid";

import { db } from "#/db";
import * as authSchema from "#/db/schema/auth-schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: authSchema,
	}),

	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
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

	user: {
		additionalFields: {
			acceptTerms: {
				type: "boolean",
			},
		},
	},
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
