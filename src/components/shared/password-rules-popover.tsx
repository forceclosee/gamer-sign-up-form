import { For, Show } from "solid-js";

import { Check, X } from "lucide-solid";

import { passwordRules } from "#/lib/schema/sign-up-schema";
import { classList } from "#/utils/class-helper";

import { Popover } from "#/components/ui/kobalte-popover";

interface Props {
	inputValue: string;
}

export const PasswordRulesPopover = (props: Props) => {
	return (
		<Popover.Portal>
			<Popover.Content onOpenAutoFocus={(e) => e.preventDefault()}>
				<Popover.Arrow />

				<Popover.Title class="sr-only">Password Rules</Popover.Title>

				<ul class="text-sm">
					<For each={passwordRules}>
						{(rule) => {
							const isPassed = () => rule.test(props.inputValue);

							return (
								<li
									class={classList(
										"flex items-center gap-2 transition-colors duration-200",
										isPassed() ? "text-text-success" : "text-text-muted",
									)}>
									<Show
										when={isPassed()}
										fallback={
											<X
												strokeWidth={3}
												class="shrink-0 text-text-error block-[1em] inline-auto"
											/>
										}>
										<Check
											strokeWidth={3}
											class="shrink-0 block-[1em] inline-auto"
										/>
									</Show>

									<span class="font-medium">{rule.label}</span>
								</li>
							);
						}}
					</For>
				</ul>
			</Popover.Content>
		</Popover.Portal>
	);
};
