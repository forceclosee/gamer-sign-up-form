import { createFormHook } from "@tanstack/solid-form";

import { TextField } from "#/components/field-and-form/text-field";
import { SubmitButton } from "#/components/field-and-form/submit-button";
import { fieldContext, formContext } from "#/hook/form-context";
import { CheckboxField } from "#/components/field-and-form/checkbox-field";
import { PasswordField } from "#/components/field-and-form/password-field";

export const { useAppForm } = createFormHook({
	fieldContext: fieldContext,
	formContext: formContext,
	fieldComponents: { TextField, CheckboxField, PasswordField },
	formComponents: { SubmitButton },
});
