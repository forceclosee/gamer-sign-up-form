import { createEffect, createMemo } from "solid-js";

import {
	getPartialFormState,
	updateFormState,
} from "#/lib/store/form-state.store";

import { Separator } from "#/components/ui/base-separator";

export const createValidity = () => {
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

	createEffect(() => {
		updateFormState({ validFieldsCounts: getValidFieldsCount() });
	});

	return { validities };
};
