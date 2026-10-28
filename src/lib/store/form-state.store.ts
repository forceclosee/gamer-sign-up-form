import type { Accessor } from "solid-js";
import { createStore, useSelector } from "@tanstack/solid-store";

type Validity =
	| "pending"
	| "required"
	| "missing"
	| "too short"
	| "too long"
	| "bad character"
	| "malformed"
	| "mismatch"
	| "not available"
	| "ok"
	| "locked";

interface FormStateStore {
	callsign: string | null;
	isSuccesfullySubmitted: boolean | undefined;
	callsignValidity: Validity;
	emailValidity: Validity;
	passwordValidity: Validity;
	confirmPasswordValidity: Validity;
	termsValidity: Validity;
	isCallsignValid: boolean | undefined;
	isEmailValid: boolean | undefined;
	isPasswordValid: boolean | undefined;
	isConfirmPasswordValid: boolean | undefined;
	isTermsValid: boolean | undefined;
}

export const formStateStore = createStore<FormStateStore>({
	callsign: null,
	isSuccesfullySubmitted: undefined,
	callsignValidity: "pending",
	emailValidity: "pending",
	passwordValidity: "pending",
	confirmPasswordValidity: "pending",
	termsValidity: "required",
	isCallsignValid: undefined,
	isEmailValid: undefined,
	isPasswordValid: undefined,
	isConfirmPasswordValid: undefined,
	isTermsValid: undefined,
});

export const getPartialFormState = <K extends keyof FormStateStore>(
	param: K,
): Accessor<FormStateStore[K]> => {
	return useSelector(formStateStore, (state) => state[param]);
};

export const updateFormState = (newState: Partial<FormStateStore>) => {
	formStateStore.setState((prev) => {
		return {
			...prev,
			...newState,
		};
	});
};
