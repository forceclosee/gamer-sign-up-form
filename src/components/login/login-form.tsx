import type { Setter } from "solid-js";

import { useAppForm } from "#/hook/form";
import { createIsomorphicLoginMethod } from "#/hook/create-isomorphic-login-method";
import { loginSchema } from "#/lib/schema/login-schema";

import { stackedToast } from "#/components/ui/base-toast";

interface Props {
	setIsloginFailed: Setter<boolean>;
}

export const LoginForm = (props: Props) => {
	const form = useAppForm(() => ({
		defaultValues: {
			loginCallsignOrEmail: "",
			loginPassword: "",
		},
		validators: {
			onChange: loginSchema,
			onSubmit: loginSchema,
		},

		onSubmit: async ({ value, formApi }) => {
			const { data, error } = await createIsomorphicLoginMethod(value);

			if (error) {
				props.setIsloginFailed(true);

				setTimeout(() => {
					props.setIsloginFailed(false);
				}, 400);

				stackedToast.error({
					title: "Login Failed",
					description:
						`${error.message}, Please try again later.` ||
						"Something went wrong, Please try again later.",
				});

				return;
			}

			formApi.reset();

			stackedToast.success({
				title: "Login successfully",
				description: `Welcome back ${data.user.username}!`,
			});
		},

		onSubmitInvalid() {
			const invalidInput = document.querySelector<HTMLInputElement>(
				"[aria-invalid='true']",
			);

			invalidInput?.focus();

			props.setIsloginFailed(true);

			setTimeout(() => {
				props.setIsloginFailed(false);
			}, 400);
		},
	}));

	return (
		<form
			novalidate
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			class="grid gap-5.5">
			<form.AppForm>
				<form.AppField name="loginCallsignOrEmail">
					{(field) => (
						<field.TextField
							label="Callsign"
							placeholder="e.g. Vortex_07 or you@example.com"
							description="Enter your callsign or email address"
						/>
					)}
				</form.AppField>

				<form.AppField name="loginPassword">
					{(field) => (
						<field.PasswordField
							label="Password"
							placeholder="Enter your password"
							description="Enter your password"
						/>
					)}
				</form.AppField>

				<form.SubmitButton
					label="login"
					labelSubmitting={<span class="loader" data-label="LOGGING IN"></span>}
				/>
			</form.AppForm>
		</form>
	);
};
