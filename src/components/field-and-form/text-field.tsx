import {
	mergeProps,
	Show,
	type ComponentProps,
	createUniqueId,
	createEffect,
} from "solid-js";

import { Check, Info, TriangleAlert } from "lucide-solid";

import { useFieldContext, useFormContext } from "#/hook/form-context";
import { updateFormState } from "#/lib/store/form-state.store";
import { createCapslock } from "#/hook/create-capslock";
import { toKebabCase } from "#/utils/attributes-helper";
import { cn } from "#/utils/class-helper";

import { Field } from "#/components/ui/base-field";
import { Input } from "#/components/ui/base-input";

interface Props {
	type?: ComponentProps<"input">["type"];
	label: string;
	description?: string;
	placeholder: string;
}

export const TextField = (props: Props) => {
	// default type 'text'
	const merged = mergeProps({ type: "text" as Props["type"] }, props);

	const isCapsLockPressed = createCapslock();

	const inputAnchor = `--${createUniqueId()}`;

	const form = useFormContext();
	const field = useFieldContext<string>();

	const fieldName = toKebabCase(field().name);

	return (
		<form.Subscribe selector={(state) => state.submissionAttempts}>
			{(submissionAttempts) => {
				const isInputInvalid = () =>
					!field().state.meta.isValid &&
					(field().state.meta.isBlurred || submissionAttempts() > 0);

				const isInputValid = () =>
					field().state.meta.isValid && field().state.meta.isDirty;

				// synchronize form validity
				createEffect(() => {
					// callsign
					if (field().name === "signupCallsign") {
						if (!isInputInvalid() && !isInputValid()) {
							updateFormState({
								callsignValidity: "pending",
								callsign: null,
								isCallsignValid: undefined,
							});
							return;
						}

						if (isInputValid()) {
							updateFormState({
								callsignValidity: "ok",
								callsign: field().state.value,
								isCallsignValid: true,
							});
							return;
						}

						if (isInputInvalid()) {
							updateFormState({ callsign: null, isCallsignValid: false });

							switch (field().state.meta.errors[0]?.message) {
								case "Enter a callsign":
									updateFormState({ callsignValidity: "required" });
									break;

								case "Use at least 3 characters":
									updateFormState({ callsignValidity: "too short" });
									break;

								case "Use 20 characters or fewer":
									updateFormState({ callsignValidity: "too long" });
									break;

								case "Use letters, numbers, _ or - only":
									updateFormState({ callsignValidity: "malformed" });
									break;
							}
						}
					}

					// email
					if (field().name === "signupEmail") {
						if (!isInputInvalid() && !isInputValid()) {
							updateFormState({
								emailValidity: "pending",
								isEmailValid: undefined,
							});
							return;
						}

						if (isInputValid()) {
							updateFormState({ emailValidity: "ok", isEmailValid: true });
							return;
						}

						if (isInputInvalid()) {
							updateFormState({
								emailValidity: "malformed",
								isEmailValid: false,
							});
						}
					}
				});

				return (
					<Field.Root>
						<div class="flex flex-wrap items-center justify-between gap-4">
							<Field.Label class="uppercase">
								<span class="me-2 inline-block text-primary">{`>`}</span>
								{merged.label}
							</Field.Label>

							<Show when={isCapsLockPressed()}>
								<span class="text-text-info trim-text">
									<Info class="me-2 inline-block block-[1.4em] inline-[1.4em]" />
									Capslock is on
								</span>
							</Show>
						</div>

						<Input
							type={merged.type}
							name={fieldName}
							placeholder={merged.placeholder}
							value={field().state.value}
							onInput={(e) => field().handleChange(e.target.value)}
							onBlur={field().handleBlur}
							class={cn(
								"border border-border bg-bg-page px-4 hover:border-primary hover:ring hover:ring-primary hover:ring-inset focus:border-primary focus:ring focus:ring-primary focus:ring-inset",
								{
									"border-border-error hover:border-border-error hover:ring hover:ring-border-error hover:ring-inset focus:border-border-error focus:ring focus:ring-border-error focus:ring-inset":
										isInputInvalid(),
								},
								{
									"border-border-success pe-12 hover:border-border-success hover:ring hover:ring-border-success hover:ring-inset focus:border-border-success focus:ring focus:ring-border-success focus:ring-inset":
										isInputValid(),
								},
							)}
							style={{ "anchor-name": inputAnchor }}
							aria-invalid={isInputInvalid()}
						/>

						{/* check icon on valid state */}
						<Show when={isInputValid()}>
							<Check
								class="pointer-events-none absolute inset-e-4 text-primary block-5 inline-5"
								style={{
									"position-anchor": inputAnchor,
									"position-area": "center",
								}}
							/>
						</Show>

						{/* error message */}
						<Show when={isInputInvalid()}>
							<Field.Error match={true} class="leading-4">
								<TriangleAlert class="me-2 inline-block block-[1.4em] inline-[1.4em]" />
								<span>{field().state.meta.errors[0]?.message}</span>
							</Field.Error>
						</Show>

						{/* description */}
						<Show when={props.description}>
							<Field.Description>{merged.description}</Field.Description>
						</Show>
					</Field.Root>
				);
			}}
		</form.Subscribe>
	);
};
