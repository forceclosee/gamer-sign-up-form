import { For } from "solid-js";

import { getPartialFormState } from "#/lib/store/form-state.store";

import { cn } from "#/utils/class-helper";
import { createValidity } from "#/hook/create-validity";

export const Operator = () => {
	const { validities } = createValidity();

	const isSuccesfullySubmitted = getPartialFormState("isSuccesfullySubmitted");

	const callsign = getPartialFormState("callsign");

	const validFieldsCounts = getPartialFormState("validFieldsCounts");

	return (
		<div class="uppercase">
			<div class="flex flex-wrap justify-between gap-4 *:shrink-0 *:tracking-500 md:hidden">
				<span>Operator ID</span>
				<span class={cn({ "text-text": callsign() })}>
					{callsign() || "Unassigned"}
				</span>
			</div>

			<div class="hidden md:block">
				<div class="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.75 *:not-last:tracking-500">
					<span>Operator ID</span>
					<span
						class={cn("transition-colors duration-200", {
							"text-primary":
								isSuccesfullySubmitted() || validFieldsCounts() === 5,
						})}>
						{isSuccesfullySubmitted()
							? "provisioned"
							: `${validFieldsCounts()}/5 ready`}
					</span>
					<span
						class={cn(
							"col-span-2 font-sans text-2xl font-bold tracking-wider",
							{ "text-text": callsign() },
						)}>
						{callsign() || "Unassigned"}
					</span>
				</div>

				<div class="mbs-3.75 grid gap-1.5 tracking-500">
					<For each={validities()}>
						{(validity) => (
							<div class="grid grid-cols-[auto_1fr_auto] items-center gap-4">
								<span>{validity.field}</span>
								<validity.separator />
								<span
									class={cn(
										"justify-self-end transition-colors duration-200",
										{
											"text-text":
												validity.isValid !== undefined && validity.isValid,
										},
										{
											"text-text-error":
												validity.isValid !== undefined && !validity.isValid,
										},
									)}>
									{validity.status}
								</span>
							</div>
						)}
					</For>
				</div>
			</div>
		</div>
	);
};
