import { createMemo, For } from "solid-js";

import { getPartialFormState } from "#/lib/store/form-state.store";

import { Separator } from "#/components/ui/base-separator";
import { cn } from "#/utils/class-helper";

export const Operator = () => {
	const callsignStatus = getPartialFormState("callsignValidity");
	const emailStatus = getPartialFormState("emailValidity");
	const passwordStatus = getPartialFormState("passwordValidity");
	const confirmPasswordStatus = getPartialFormState("confirmPasswordValidity");
	const termsStatus = getPartialFormState("termsValidity");

	const isCallsignValid = getPartialFormState("isCallsignValid");
	const isEmailValid = getPartialFormState("isEmailValid");
	const isPasswordValid = getPartialFormState("isPasswordValid");
	const isConfirmPasswordValid = getPartialFormState("isConfirmPasswordValid");
	const isTermsValid = getPartialFormState("isTermsValid");

	const isSuccesfullySubmitted = getPartialFormState("isSuccesfullySubmitted");

	const callsign = getPartialFormState("callsign");

	const validities = createMemo(() => [
		{
			field: "Callsign",
			separator: Separator,
			status: callsignStatus(),
			isValid: isCallsignValid(),
		},
		{
			field: "Email",
			separator: Separator,
			status: emailStatus(),
			isValid: isEmailValid(),
		},
		{
			field: "Password",
			separator: Separator,
			status: passwordStatus(),
			isValid: isPasswordValid(),
		},
		{
			field: "Confirm",
			separator: Separator,
			status: confirmPasswordStatus(),
			isValid: isConfirmPasswordValid(),
		},
		{
			field: "Terms",
			separator: Separator,
			status: termsStatus(),
			isValid: isTermsValid(),
		},
	]);

	const getValidFieldsCount = () => {
		const validFields = () =>
			validities().filter((field) => field.status === "ok");

		return validFields().length;
	};

	return (
		<div class="uppercase">
			<div class="flex flex-wrap justify-between gap-4 *:shrink-0 *:tracking-500 md:hidden">
				<span>Operator ID</span>
				<span class={cn({ "text-text": callsign() })}>
					{callsign() || "Unassigned"}
				</span>
			</div>

			<div class="hidden md:block">
				<div class="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.75 *:not-last:tracking-500">
					<span>Operator ID</span>
					<span
						class={cn("transition-colors duration-200", {
							"text-primary":
								isSuccesfullySubmitted() || getValidFieldsCount() === 5,
						})}>
						{isSuccesfullySubmitted()
							? "provisioned"
							: `${getValidFieldsCount()}/5 ready`}
					</span>
					<span
						class={cn(
							"col-span-2 font-sans text-2xl font-bold tracking-wider",
							{ "text-text": callsign() },
						)}>
						{callsign() || "Unassigned"}
					</span>
				</div>

				<div class="mbs-3.75 grid gap-1.5 tracking-500">
					<For each={validities()}>
						{(validity) => (
							<div class="grid grid-cols-[auto_1fr_auto] items-center gap-4">
								<span>{validity.field}</span>
								<validity.separator />
								<span
									class={cn(
										"justify-self-end transition-colors duration-200",
										{
											"text-text":
												validity.isValid !== undefined && validity.isValid,
										},
										{
											"text-text-error":
												validity.isValid !== undefined && !validity.isValid,
										},
									)}>
									{validity.status}
								</span>
							</div>
						)}
					</For>
				</div>
			</div>
		</div>
	);
};
