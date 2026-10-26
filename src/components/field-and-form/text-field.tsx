import {
	type JSX,
	mergeProps,
	Show,
	type ComponentProps,
	createUniqueId,
} from "solid-js";

import { useFieldContext, useFormContext } from "#/hook/form-context";
import { toKebabCase } from "#/utils/attributes-helper";

import { Field } from "#/components/ui/base-field";
import { Input } from "#/components/ui/base-input";
import { cn } from "#/utils/class-helper";
import { Check, TriangleAlert } from "lucide-solid";

interface Props {
	type?: ComponentProps<"input">["type"];
	label: JSX.Element;
	description?: string;
	placeholder: string;
}

export const TextField = (props: Props) => {
	// default type 'text'
	const merged = mergeProps({ type: "text" as Props["type"] }, props);

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

				return (
					<Field.Root>
						<Field.Label class="uppercase">{merged.label}</Field.Label>
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
								class="absolute inset-e-4 text-primary block-[1.8em] inline-[1.8em]"
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
