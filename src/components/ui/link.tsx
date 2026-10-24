import {
	Link as TanstackLink,
	type LinkComponentProps,
} from "@tanstack/solid-router";
import { mergeProps, splitProps } from "solid-js";

import { cn } from "#/utils/class-helper";

interface Props extends LinkComponentProps {
	variant?: "plain" | "primary";
}

export const Link = (props: Props) => {
	// default variant primary
	const merged = mergeProps({ variant: "primary" }, props);

	const [core, rest] = splitProps(merged, ["class", "variant", "children"]);

	return (
		<TanstackLink
			to={props.to}
			class={cn(
				"flex items-center justify-center px-4 font-medium transition-all duration-200 trim-text active:scale-95",
				{
					"bg-primary text-text-inverse min-block-9.5":
						merged.variant === "primary",
				},
			)}
			{...rest}>
			{core.children}
		</TanstackLink>
	);
};
