import {
	mergeProps,
	splitProps,
	type ComponentProps,
	type ParentProps,
} from "solid-js";

import { Button as KbButton } from "@kobalte/core/button";

import { cn } from "#/utils/class-helper";

interface Props extends ComponentProps<"button"> {
	variant?: "plain" | "primary";
}

export const Button = (props: ParentProps<Props>) => {
	// default variant primary, default type button
	const merged = mergeProps(
		{
			variant: "primary" as Props["variant"],
			type: "button" as Props["type"],
		},
		props,
	);

	const [core, rest] = splitProps(merged, ["class", "variant", "children"]);

	return (
		<KbButton
			class={cn(
				"flex cursor-pointer items-center justify-center px-4 font-medium transition-all duration-200 trim-text active:scale-95",
				{
					"bg-primary text-text-inverse min-block-9.5":
						merged.variant === "primary",
				},
			)}
			{...rest}>
			{core.children}
		</KbButton>
	);
};
