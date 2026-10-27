import { createAuthClient } from "better-auth/solid";
import {
	usernameClient,
	inferAdditionalFields,
} from "better-auth/client/plugins";

import type { auth } from "#/lib/auth";

export const authClient = createAuthClient({
	plugins: [
		usernameClient({
			displayUsername: false,
		}),
		inferAdditionalFields<typeof auth>(),
	],
});
