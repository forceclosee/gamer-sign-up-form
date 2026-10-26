import { Input as BaseInput } from "@msviderok/base-ui-solid/input";

import { cn } from "#/utils/class-helper";

interface ClashProps {
	class?: string;
}

interface InputProps extends Omit<BaseInput.Props, "class">, ClashProps {}

export function Input(props: InputProps) {
	return (
		<BaseInput
			{...props}
			class={cn(
				"text-base outline-transparent transition-all duration-200 min-block-12",
				props.class,
			)}
		/>
	);
}
