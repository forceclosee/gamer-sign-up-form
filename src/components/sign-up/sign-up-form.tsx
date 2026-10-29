import { useAppForm } from "#/hook/form";
import { signupSchema } from "#/lib/schema/sign-up-schema";
import { updateFormState } from "#/lib/store/form-state.store";
import { authClient } from "#/lib/auth-client";

import { Separator } from "#/components/ui/base-separator";
import { Link } from "#/components/ui/link";
import { stackedToast } from "#/components/ui/base-toast";

export const SignupForm = () => {
	const form = useAppForm(() => ({
		defaultValues: {
			signupCallsign: "",
			signupEmail: "",
			signupPassword: "",
			signupConfirmPassword: "",
			signupAcceptTerms: false,
		},
		validators: {
			onChange: signupSchema,
			onSubmit: signupSchema,
		},

		onSubmit: async ({ value, formApi }) => {
			const { data, error } = await authClient.signUp.email({
				name: value.signupCallsign,
				username: value.signupCallsign,
				email: value.signupEmail,
				password: value.signupConfirmPassword,
				acceptTerms: value.signupAcceptTerms,
			});

			if (error) {
				const getErrorDescription = () => {
					if (!error?.message) {
						return "Something went wrong, Please try again later.";
					}

					switch (error?.message) {
						case "Username is already taken. Please try another.":
							return "Callsign is already taken. Please create different callsign.";

						default:
							return `${error.message}, Please try again later.`;
					}
				};

				stackedToast.error({
					title: "Signup Failed",
					description: getErrorDescription(),
				});

				updateFormState({ isSuccesfullySubmitted: false });

				setTimeout(() => {
					updateFormState({ isSuccesfullySubmitted: undefined });
				}, 400);

				return;
			}

			formApi.reset();

			stackedToast.success({
				title: "Signup successfully",
				description: `Thanks for signing up ${data.user.username}!`,
			});

			// synchronize form validity
			updateFormState({
				isSuccesfullySubmitted: true,
				callsign: data.user.username,
				callsignValidity: "locked",
				emailValidity: "locked",
				passwordValidity: "locked",
				confirmPasswordValidity: "locked",
				termsValidity: "locked",
				isCallsignValid: true,
				isEmailValid: true,
				isPasswordValid: true,
				isConfirmPasswordValid: true,
				isTermsValid: true,
			});
		},

		onSubmitInvalid() {
			const invalidInput = document.querySelector<HTMLInputElement>(
				"[aria-invalid='true']",
			);

			invalidInput?.focus();

			updateFormState({ isSuccesfullySubmitted: false });

			setTimeout(() => {
				updateFormState({ isSuccesfullySubmitted: undefined });
			}, 400);
		},
	}));

	return (
		<>
			<div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 uppercase *:shrink-0 *:tracking-500">
				<h2 class="trim-capital">New operator</h2>
				<span class="@md/signup:hidden">All required</span>
				<span class="hidden @md/signup:inline">All fields required</span>
			</div>

			<Separator class="mbs-3.5 mbe-5.75" />

			<form
				novalidate
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				class="grid gap-5.5">
				<form.AppForm>
					<form.AppField name="signupCallsign">
						{(field) => (
							<field.TextField
								label="Callsign"
								placeholder="e.g. Vortex_07"
								description="3–20 characters: letters, numbers, _ or -"
							/>
						)}
					</form.AppField>

					<form.AppField name="signupEmail">
						{(field) => (
							<field.TextField
								type="email"
								label="Email"
								placeholder="you@example.com"
							/>
						)}
					</form.AppField>

					<form.AppField name="signupPassword">
						{(field) => (
							<field.PasswordField
								label="Password"
								placeholder="Create a password"
								havePasswordStrengthMeter
							/>
						)}
					</form.AppField>

					<form.AppField name="signupConfirmPassword">
						{(field) => (
							<field.PasswordField
								label="Confirm password"
								placeholder="Confirm your password"
							/>
						)}
					</form.AppField>

					<form.AppField name="signupAcceptTerms">
						{(field) => (
							<field.CheckboxField
								label={
									<>
										I accept the{" "}
										<Link variant="inline" to="/signup">
											Terms
										</Link>{" "}
										and{" "}
										<Link variant="inline" to="/signup">
											Privacy Policy
										</Link>
										.
									</>
								}
							/>
						)}
					</form.AppField>

					<form.SubmitButton
						label="Initialize account"
						labelSubmitting={
							<span class="loader" data-label="TRANSMITTING"></span>
						}
					/>
				</form.AppForm>
			</form>

			<p class="mbs-6.5 text-center text-sm">
				Already an operator?{" "}
				<Link variant="inline" to="/login">
					Log in
				</Link>
			</p>
		</>
	);
};
