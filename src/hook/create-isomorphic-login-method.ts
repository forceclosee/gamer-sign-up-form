import { authClient } from "#/lib/auth-client";

interface Params {
	loginCallsignOrEmail: string;
	loginPassword: string;
}

export const createIsomorphicLoginMethod = async (value: Params) => {
	const isEmail = value.loginCallsignOrEmail.includes("@");

	if (isEmail) {
		return await authClient.signIn.email({
			email: value.loginCallsignOrEmail,
			password: value.loginPassword,
		});
	}

	return await authClient.signIn.username({
		username: value.loginCallsignOrEmail,
		password: value.loginPassword,
	});
};
