import { Show, createUniqueId, createSignal, createEffect } from "solid-js";

import { Check, Eye, EyeOff, Info, TriangleAlert } from "lucide-solid";

import { useFieldContext, useFormContext } from "#/hook/form-context";
import { createCapslock } from "#/hook/create-capslock";
import { updateFormState } from "#/lib/store/form-state.store";
import { toKebabCase } from "#/utils/attributes-helper";
import { cn } from "#/utils/class-helper";

import { Field } from "#/components/ui/base-field";
import { Input } from "#/components/ui/base-input";
import { PasswordStrengthMeter } from "#/components/shared/password-strength-meter";
import { Popover } from "#/components/ui/kobalte-popover";
import { PasswordRulesPopover } from "#/components/shared/password-rules-popover";
import { Button } from "#/components/ui/kobalte-button";

interface Props {
	label: string;
	description?: string;
	placeholder: string;
	havePasswordStrengthMeter?: boolean;
}

export const PasswordField = (props: Props) => {
	const [inputType, setInputType] = createSignal<"password" | "text">(
		"password",
	);

	const [isPopoverOpen, setIsPopoverOpen] = createSignal(false);

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
					// password
					if (field().name === "signupPassword") {
						if (!isInputInvalid() && !isInputValid()) {
							updateFormState({
								passwordValidity: "pending",
								isPasswordValid: undefined,
							});
							return;
						}

						if (isInputValid()) {
							updateFormState({
								passwordValidity: "ok",
								isPasswordValid: true,
							});
							return;
						}

						if (isInputInvalid()) {
							updateFormState({ isPasswordValid: false });

							switch (field().state.meta.errors[0]?.message) {
								case "Use at least 8 characters":
									updateFormState({ passwordValidity: "too short" });
									break;

								case "Use at least one uppercase letter":
									updateFormState({ passwordValidity: "malformed" });
									break;

								case "Use at least one number":
									updateFormState({ passwordValidity: "malformed" });
									break;

								case "Use at least one special character":
									updateFormState({ passwordValidity: "malformed" });
									break;
							}
						}
					}

					// confirm password
					if (field().name === "signupConfirmPassword") {
						if (!isInputInvalid() && !isInputValid()) {
							updateFormState({
								confirmPasswordValidity: "pending",
								isConfirmPasswordValid: undefined,
							});
							return;
						}

						if (isInputValid()) {
							updateFormState({
								confirmPasswordValidity: "ok",
								isConfirmPasswordValid: true,
							});
							return;
						}

						if (isInputInvalid()) {
							updateFormState({
								confirmPasswordValidity: "mismatch",
								isConfirmPasswordValid: false,
							});
						}
					}
				});

				return (
					<Field.Root>
						<div class="flex flex-wrap items-center justify-between gap-4">
							<Field.Label class="uppercase">
								<span class="me-2 inline-block text-primary">{`>`}</span>
								{props.label}
							</Field.Label>

							<Show when={isCapsLockPressed()}>
								<span class="text-text-info trim-text">
									<Info class="me-2 inline-block block-[1.4em] inline-[1.4em]" />
									Capslock is on
								</span>
							</Show>
						</div>

						<Popover open={isPopoverOpen()} placement="left" flip="top">
							<Popover.Anchor>
								<div
									class={cn(
										"grid grid-cols-[1fr_auto] items-center border border-border bg-bg-page transition-all duration-200 inline-full focus-within:border-primary focus-within:ring focus-within:ring-primary focus-within:ring-inset hover:border-primary hover:ring hover:ring-primary hover:ring-inset",
										{
											"border-border-error focus-within:border-border-error focus-within:ring focus-within:ring-border-error focus-within:ring-inset hover:border-border-error hover:ring hover:ring-border-error hover:ring-inset":
												isInputInvalid(),
										},
										{
											"border-border-success focus-within:border-border-success focus-within:ring focus-within:ring-border-success focus-within:ring-inset hover:border-border-success hover:ring hover:ring-border-success hover:ring-inset":
												isInputValid(),
										},
									)}>
									<Input
										type={inputType()}
										name={fieldName}
										placeholder={props.placeholder}
										value={field().state.value}
										onInput={(e) => field().handleChange(e.target.value)}
										onBlur={field().handleBlur}
										onFocusIn={() => setIsPopoverOpen(true)}
										onFocusOut={() => setIsPopoverOpen(false)}
										class={cn("ps-4", { "pe-8": isInputValid() })}
										style={{ "anchor-name": inputAnchor }}
										aria-invalid={isInputInvalid()}
									/>

									{/* toggle password visibility button */}
									<Button
										variant="plain"
										class="mx-1.75 block-8 inline-8"
										onClick={() =>
											setInputType((prev) =>
												prev === "password" ? "text" : "password",
											)
										}
										aria-label="Toggle password visibility"
										aria-pressed={inputType() === "text"}>
										<Show
											when={inputType() === "text"}
											fallback={<Eye class="block-5 inline-5" />}>
											<EyeOff class="text-primary block-5 inline-5" />
										</Show>
									</Button>
								</div>
							</Popover.Anchor>

							{/* password rules */}
							<Show when={props.havePasswordStrengthMeter}>
								<PasswordRulesPopover inputValue={field().state.value} />
							</Show>
						</Popover>

						{/* check icon on valid state */}
						<Show when={isInputValid()}>
							<Check
								class="pointer-events-none absolute inset-e-0 text-primary block-5 inline-5"
								style={{
									"position-anchor": inputAnchor,
									"position-area": "center",
								}}
							/>
						</Show>

						{/* password strength meter */}
						<Show when={props.havePasswordStrengthMeter}>
							<PasswordStrengthMeter inputValue={field().state.value} />
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
							<Field.Description>{props.description}</Field.Description>
						</Show>
					</Field.Root>
				);
			}}
		</form.Subscribe>
	);
};
