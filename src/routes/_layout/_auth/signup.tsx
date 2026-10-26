import { createFileRoute } from "@tanstack/solid-router";

import { ChevronDown } from "lucide-solid";

import { Logo } from "#/components/icons/logo";
import { Operator } from "#/components/sign-up/operator";
import { Separator } from "#/components/ui/base-separator";
import { SignupForm } from "#/components/sign-up/sign-up-form";

export const Route = createFileRoute("/_layout/_auth/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div class="grid items-center gap-4 px-4 py-8.5 md:grid-cols-[566fr_434fr]">
			<div>
				<div class="flex flex-wrap items-center justify-between gap-4 *:shrink-0">
					<Logo class="block-auto inline-max" />
					<span class="uppercase md:hidden">0/5 ready</span>
				</div>

				<h1 class="mbs-[clamp(2.5rem,0.4776rem+8.6286vw,6rem)] font-sans font-bold tracking-wider text-text uppercase">{`// Join the nexus`}</h1>

				<p class="mbs-[clamp(0.5rem,0.1388rem+1.5408vw,1.125rem)] tracking-500 uppercase">
					Initialize your NEONCORE identity
				</p>

				<Separator class="mbs-[clamp(1.4375rem,-0.007rem+6.1633vw,3.9375rem)] mbe-[clamp(0.875rem,0.586rem+1.2326vw,1.375rem)]" />

				<Operator />
			</div>

			<div class="@container/signup relative grid items-center border border-border bg-bg-card min-block-169.25">
				<div class="px-[clamp(1.1875rem,-10.2454rem+48.7804cqw,2.4375rem)] py-[clamp(1.875rem,-2.6981rem+19.5121cqw,2.375rem)]">
					<SignupForm />
				</div>

				<ChevronDown
					nonScalingStroke
					strokeWidth={2}
					class="absolute -inset-s-6.5 -inset-bs-6.5 rotate-135 text-primary block-16 inline-16"
				/>

				<ChevronDown
					nonScalingStroke
					strokeWidth={2}
					class="absolute -inset-e-6.5 -inset-be-6.5 rotate-315 text-primary block-16 inline-16"
				/>
			</div>
		</div>
	);
}
