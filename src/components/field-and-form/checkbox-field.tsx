import { createEffect, type JSX, Show } from "solid-js";

import { Check, TriangleAlert } from "lucide-solid";

import { useFieldContext, useFormContext } from "#/hook/form-context";
import { updateFormState } from "#/lib/store/form-state.store";
import { toKebabCase } from "#/utils/attributes-helper";
import { cn } from "#/utils/class-helper";

import { Checkbox } from "#/components/ui/kobalte-checkbox";

interface Props {
	label: JSX.Element;
}

export const CheckboxField = (props: Props) => {
	const form = useFormContext();
	const field = useFieldContext<boolean>();

	const fieldName = toKebabCase(field().name);

	return (
		<form.Subscribe selector={(state) => state.submissionAttempts}>
			{(submissionAttempts) => {
				const isInputInvalid = () =>
					!field().state.meta.isValid &&
					(field().state.meta.isDirty || submissionAttempts() > 0);

				const isInputValid = () =>
					field().state.meta.isValid && field().state.meta.isDirty;

				// synchronize form validity
				createEffect(() => {
					// confirm password
					if (field().name === "signupAcceptTerms") {
						if (!isInputInvalid() && !isInputValid()) {
							updateFormState({
								termsValidity: "required",
								isTermsValid: undefined,
							});
							return;
						}

						if (isInputValid()) {
							updateFormState({ termsValidity: "ok", isTermsValid: true });
							return;
						}

						if (isInputInvalid()) {
							updateFormState({
								termsValidity: "required",
								isTermsValid: false,
							});
						}
					}
				});

				return (
					<Checkbox
						name={fieldName}
						checked={field().state.value}
						onChange={(checked) => field().handleChange(checked)}
						class="grid gap-2">
						<div class="flex items-center gap-2.75">
							<Checkbox.Input class="peer" aria-invalid={isInputInvalid()} />
							<Checkbox.Control
								class={cn(
									"shrink-0 border border-border bg-bg-page transition-all duration-200 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary hover:border-border-light",
									{
										"border-border-error hover:border-border-error":
											isInputInvalid(),
									},
									{ "border-primary bg-primary": isInputValid() },
								)}>
								<Checkbox.Indicator forceMount>
									<Check
										strokeWidth={3}
										class="text-text-inverse block-3.5 inline-3.5"
									/>
								</Checkbox.Indicator>
							</Checkbox.Control>
							<Checkbox.Label>{props.label}</Checkbox.Label>
						</div>

						<Show when={isInputInvalid()}>
							<Checkbox.ErrorMessage forceMount class="leading-4">
								<TriangleAlert class="me-2 inline-block block-[1.4em] inline-[1.4em]" />
								<span>{field().state.meta.errors[0]?.message}</span>
							</Checkbox.ErrorMessage>
						</Show>
					</Checkbox>
				);
			}}
		</form.Subscribe>
	);
};
