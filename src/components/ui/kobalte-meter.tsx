import { cn } from "#/utils/class-helper";
import {
	Meter as KbMeter,
	type MeterFillProps,
	type MeterLabelProps,
	type MeterRootProps,
	type MeterTrackProps,
	type MeterValueLabelProps,
} from "@kobalte/core/meter";
import type { ParentProps } from "solid-js";

interface ClassProps {
	class?: string;
}

interface RootProps extends ParentProps<MeterRootProps>, ClassProps {}

const Root = (props: RootProps) => {
	return <KbMeter {...props} />;
};

interface LabelProps extends ParentProps<MeterLabelProps>, ClassProps {}

const Label = (props: LabelProps) => {
	return <KbMeter.Label {...props} class={cn("text-sm", props.class)} />;
};

interface ValueLabelProps extends MeterValueLabelProps, ClassProps {}

const ValueLabel = (props: ValueLabelProps) => {
	return <KbMeter.ValueLabel {...props} />;
};

interface TrackProps extends MeterTrackProps, ClassProps {}

const Track = (props: ParentProps<TrackProps>) => {
	return <KbMeter.Track {...props} class={cn("block-1", props.class)} />;
};

interface FillProps extends ParentProps<MeterFillProps>, ClassProps {}

const Fill = (props: FillProps) => {
	return (
		<KbMeter.Fill
			{...props}
			class={cn("block-full inline-full", props.class)}
		/>
	);
};

export const Meter = Object.assign(Root, {
	Label,
	ValueLabel,
	Track,
	Fill,
});
