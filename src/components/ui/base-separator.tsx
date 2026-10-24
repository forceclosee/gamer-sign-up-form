import { classList } from "#/utils/class-helper";
import { Separator as BaseSeparator } from "@msviderok/base-ui-solid/separator";
import { mergeProps, splitProps } from "solid-js";

interface Props extends BaseSeparator.Props {
	thickess?: number;
}

export const Separator = (props: Props) => {
	// default orientations horizontal
	const merged = mergeProps(
		{
			orientation: "horizontal" as Props["orientation"],
			thickness: 1 as Props["thickess"],
		},
		props,
	);

	const [core, rest] = splitProps(merged, ["class", "orientation", "thickess"]);

	return (
		<BaseSeparator
			orientation={core.orientation}
			class={classList(
				"bg-border",
				{
					"inline-full block-(--thickness)": core.orientation === "horizontal",
				},
				{ "inline-(--thickness) block-full ": core.orientation === "vertical" },
				core.class,
			)}
			style={{
				"--thickness": core.thickess ? `${core.thickess}px` : "1px",
			}}
			{...rest}
		/>
	);
};
