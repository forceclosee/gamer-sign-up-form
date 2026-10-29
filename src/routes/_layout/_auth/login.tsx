import { createFileRoute } from "@tanstack/solid-router";
import { createSignal } from "solid-js";

import { ChevronDown } from "lucide-solid";

import { cn } from "#/utils/class-helper";

import { LoginForm } from "#/components/login/login-form";
import { Link } from "#/components/ui/link";
import { Separator } from "#/components/ui/base-separator";

export const Route = createFileRoute("/_layout/_auth/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const [isLoginFailed, setIsLoginFailed] = createSignal(false);

	return (
		<div class="mx-auto grid items-center px-4 py-8.5 inline-full max-inline-lg">
			<div
				class={cn(
					"@container/login relative grid items-center border border-border bg-bg-card min-block-113.75",
					{
						shake: isLoginFailed(),
					},
				)}>
				<div class="px-[clamp(1.1875rem,-10.2454rem+48.7804cqw,2.4375rem)] py-[clamp(1.875rem,-2.6981rem+19.5121cqw,2.375rem)]">
					<h1 class="text-xs tracking-500 uppercase trim-capital">Login</h1>

					<Separator class="mbs-3.5 mbe-5.75" />

					<LoginForm setIsloginFailed={setIsLoginFailed} />

					<p class="mbs-6.5 text-center text-sm">
						Don't have an account?{" "}
						<Link variant="inline" to="/signup">
							Sign up
						</Link>
					</p>
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
