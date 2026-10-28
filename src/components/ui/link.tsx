import {
	Link as TanstackLink,
	type LinkComponentProps,
	type LinkProps,
} from "@tanstack/solid-router";
import { mergeProps, splitProps } from "solid-js";

import { cn } from "#/utils/class-helper";

interface Props extends Omit<LinkComponentProps, "to"> {
	variant?: "plain" | "primary" | "inline";
	to: LinkProps["to"];
}

export const Link = (props: Props) => {
	// default variant primary
	const merged = mergeProps({ variant: "primary" as Props["variant"] }, props);

	const [core, rest] = splitProps(merged, [
		"to",
		"class",
		"variant",
		"children",
	]);

	return (
		<TanstackLink
			to={core.to}
			class={cn(
				{
					"flex items-center justify-center bg-primary px-4 font-medium text-text-inverse transition-all duration-200 min-block-12 trim-text active:scale-95":
						core.variant === "primary",
				},
				{ "py-0.5 text-primary hover-underline": core.variant === "inline" },
				props.class,
			)}
			{...rest}>
			{core.children}
		</TanstackLink>
	);
};
