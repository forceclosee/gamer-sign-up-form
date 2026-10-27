import { Link } from "@tanstack/solid-router";

import { useAppForm } from "#/hook/form";
import { signupSchema } from "#/lib/schema/sign-up-schema";

import { Separator } from "#/components/ui/base-separator";
import { updateFormState } from "#/lib/store/form-state.store";

export const SignupForm = () => {
	const form = useAppForm(() => ({
		defaultValues: {
			signupName: "",
			signupEmail: "",
			signupPassword: "",
			signupConfirmPassword: "",
			signupAcceptTerms: false,
		},
		validators: {
			onChange: signupSchema,
			onSubmit: signupSchema,
		},

		onSubmit: async () => {
			await new Promise((resolve) => setTimeout(resolve, 2000));
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
			<div class="flex flex-wrap justify-between gap-x-4 gap-y-2 uppercase *:shrink-0 *:tracking-500">
				<span>New operator</span>
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
					<form.AppField name="signupName">
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
										<Link
											to="/signup"
											class="py-0.5 text-primary hover-underline">
											Terms
										</Link>{" "}
										and{" "}
										<Link
											to="/signup"
											class="py-0.5 text-primary hover-underline">
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
						labelSubmitting={<span class="signup-loader"></span>}
					/>
				</form.AppForm>
			</form>

			<p class="mbs-6.5 text-center text-sm">
				Already an operator?{" "}
				<Link to="/login" class="py-0.5 text-primary hover-underline">
					Log in
				</Link>
			</p>
		</>
	);
};
