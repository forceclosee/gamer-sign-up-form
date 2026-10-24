import { createFileRoute } from "@tanstack/solid-router";

import { Logo } from "#/components/icons/logo";
import { Operator } from "#/components/sign-up/operator";
import { Separator } from "#/components/ui/base-separator";
import { SignupForm } from "#/components/sign-up/sign-up-form";

export const Route = createFileRoute("/_layout/_auth/sign-up")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div class="grid gap-4 px-4 py-8.5 md:grid-cols-2">
			<div>
				<div class="flex flex-wrap items-center justify-between gap-4 *:shrink-0">
					<Logo class="block-auto inline-max" />
					<span class="font-mono uppercase md:hidden">0/5 ready</span>
				</div>

				<h1 class="mbs-[clamp(2.5rem,0.4776rem+8.6286vw,6rem)] font-bold tracking-wider uppercase">{`// Join the nexus`}</h1>

				<p class="mbs-[clamp(0.5rem,0.1388rem+1.5408vw,1.125rem)] font-mono tracking-500 text-text-muted uppercase">
					Initialize your NEONCORE identity
				</p>

				<Separator class="mbs-[clamp(1.4375rem,-0.007rem+6.1633vw,3.9375rem)] mbe-[clamp(0.875rem,0.586rem+1.2326vw,1.375rem)]" />

				<Operator />
			</div>

			<SignupForm />
		</div>
	);
}
