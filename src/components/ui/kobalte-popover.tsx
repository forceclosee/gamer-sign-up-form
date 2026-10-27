import { cn } from "#/utils/class-helper";
import {
	Popover as KbPopover,
	type PopoverAnchorProps,
	type PopoverArrowProps,
	type PopoverCloseButtonProps,
	type PopoverContentProps,
	type PopoverDescriptionProps,
	type PopoverPortalProps,
	type PopoverRootProps,
	type PopoverTitleProps,
	type PopoverTriggerProps,
} from "@kobalte/core/popover";
import type { ParentProps } from "solid-js";

interface ClassProps {
	class?: string;
}

const Root = (props: PopoverRootProps) => {
	return <KbPopover {...props} />;
};

const Trigger = (props: PopoverTriggerProps) => {
	return <KbPopover.Trigger {...props} />;
};

const Anchor = (props: ParentProps<PopoverAnchorProps>) => {
	return <KbPopover.Anchor {...props} />;
};

const Portal = (props: PopoverPortalProps) => {
	return <KbPopover.Portal {...props} />;
};

interface ContentProps extends ParentProps<PopoverContentProps>, ClassProps {}

const Content = (props: ContentProps) => {
	return (
		<KbPopover.Content
			{...props}
			class={cn(
				"origin-(--kb-popover-content-transform-origin) hide-popover border border-border bg-bg-info p-4 max-inline-[calc(100vw-2rem)] data-expanded:show-popover",
				props.class,
			)}
		/>
	);
};

const Arrow = (props: PopoverArrowProps) => {
	return <KbPopover.Arrow {...props} />;
};

const CloseButton = (props: PopoverCloseButtonProps) => {
	return <KbPopover.CloseButton {...props} />;
};

interface TitleProps extends ParentProps<PopoverTitleProps>, ClassProps {}

const Title = (props: TitleProps) => {
	return <KbPopover.Title {...props} />;
};

const Description = (props: PopoverDescriptionProps) => {
	return <KbPopover.Description {...props} />;
};

export const Popover = Object.assign(Root, {
	Trigger,
	Anchor,
	Portal,
	Content,
	Arrow,
	CloseButton,
	Title,
	Description,
});
