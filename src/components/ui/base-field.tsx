import { Field as BaseField } from "@msviderok/base-ui-solid/field";

import { cn } from "#/utils/class-helper";

interface ClashProps {
	class?: string;
}

interface RootProps extends Omit<BaseField.Root.Props, "class">, ClashProps {}

const Root = (props: RootProps) => {
	return (
		<BaseField.Root
			{...props}
			class={cn("grid items-start gap-2 inline-full", props.class)}
		/>
	);
};

interface LabelProps extends Omit<BaseField.Label.Props, "class">, ClashProps {}

const Label = (props: LabelProps) => {
	return <BaseField.Label {...props} class={cn("tracking-500", props.class)} />;
};

const Control = (props: BaseField.Control.Props) => {
	return <BaseField.Control {...props} />;
};

interface DescriptionProps
	extends Omit<BaseField.Description.Props, "class">,
		ClashProps {}

const Description = (props: DescriptionProps) => {
	return <BaseField.Description {...props} />;
};

interface FieldErrorProps
	extends Omit<BaseField.Error.Props, "class">,
		ClashProps {}

const FieldError = (props: FieldErrorProps) => {
	return (
		<BaseField.Error
			{...props}
			class={cn(
				"text-3xs tracking-wider text-text-error trim-text",
				props.class,
			)}
		/>
	);
};

const Validity = (props: BaseField.Validity.Props) => {
	return <BaseField.Validity {...props} />;
};

export const Field = {
	Root: Root,
	Label: Label,
	Control: Control,
	Description: Description,
	Error: FieldError,
	Validity: Validity,
};
