import { For } from "solid-js";

import { Separator } from "#/components/ui/base-separator";

export const Operator = () => {
	const validities = [
		{
			field: "Callsign",
			separator: Separator,
			status: "pending",
		},
		{
			field: "Email",
			separator: Separator,
			status: "pending",
		},
		{
			field: "Password",
			separator: Separator,
			status: "pending",
		},
		{
			field: "Confirm",
			separator: Separator,
			status: "pending",
		},
		{
			field: "Terms",
			separator: Separator,
			status: "required",
		},
	];

	return (
		<div class="uppercase">
			<div class="flex flex-wrap justify-between gap-4 *:shrink-0 *:tracking-500 md:hidden">
				<span>Operator ID</span>
				<span>Unassigned</span>
			</div>

			<div class="hidden md:block">
				<div class="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.75 *:not-last:tracking-500">
					<span>Operator ID</span>
					<span>0/5 ready</span>
					<span class="col-span-2 font-sans text-2xl font-bold tracking-wider">
						Unassigned
					</span>
				</div>

				<div class="mbs-3.75 grid gap-1.5 tracking-500">
					<For each={validities}>
						{(validity) => (
							<div class="grid grid-cols-[auto_1fr_auto] items-center gap-4">
								<span>{validity.field}</span>
								<validity.separator />
								<span class="justify-self-end">{validity.status}</span>
							</div>
						)}
					</For>
				</div>
			</div>
		</div>
	);
};
