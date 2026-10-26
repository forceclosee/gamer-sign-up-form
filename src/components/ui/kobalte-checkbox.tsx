import { cn } from "#/utils/class-helper";
import {
	Checkbox as KbCheckbox,
	type CheckboxControlProps,
	type CheckboxDescriptionProps,
	type CheckboxErrorMessageProps,
	type CheckboxIndicatorProps,
	type CheckboxInputProps,
	type CheckboxLabelProps,
	type CheckboxRootProps,
} from "@kobalte/core/checkbox";
import type { ParentProps } from "solid-js";

interface ClassProps {
	class?: string;
}

interface RootProps extends CheckboxRootProps, ClassProps {}

const Root = (props: RootProps) => {
	return <KbCheckbox {...props} />;
};

interface InputProps extends CheckboxInputProps, ClassProps {}

const Input = (props: InputProps) => {
	return <KbCheckbox.Input {...props} />;
};

interface ControlProps extends ParentProps<CheckboxControlProps>, ClassProps {}

const Control = (props: ControlProps) => {
	return (
		<KbCheckbox.Control
			{...props}
			class={cn(
				"flex items-center justify-center block-6 inline-6 *:shrink-0",
				props.class,
			)}
		/>
	);
};

interface IndicatorProps
	extends ParentProps<CheckboxIndicatorProps>,
		ClassProps {}

const Indicator = (props: IndicatorProps) => {
	return <KbCheckbox.Indicator class={cn("", props.class)} {...props} />;
};

interface LabelProps extends ParentProps<CheckboxLabelProps>, ClassProps {}

const Label = (props: LabelProps) => {
	return (
		<KbCheckbox.Label
			class={cn("text-sm trim-capital", props.class)}
			{...props}
		/>
	);
};

const Description = (props: CheckboxDescriptionProps) => {
	return <KbCheckbox.Description {...props} />;
};

interface ErrorMessageProps
	extends ParentProps<CheckboxErrorMessageProps>,
		ClassProps {}

const ErrorMessage = (props: ErrorMessageProps) => {
	return (
		<KbCheckbox.ErrorMessage
			{...props}
			class={cn("text-3xs tracking-wider text-text-error", props.class)}
		/>
	);
};

export const Checkbox = Object.assign(Root, {
	Input,
	Control,
	Indicator,
	Label,
	Description,
	ErrorMessage,
});
