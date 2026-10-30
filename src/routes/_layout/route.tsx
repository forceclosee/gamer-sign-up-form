import { createFileRoute, Outlet } from "@tanstack/solid-router";

import { Footer } from "#/components/layout/footer";
import { BgPattern } from "#/components/icons/bg-pattern";

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div class="relative isolate overflow-clip max-inline-svw">
			<BgPattern class="absolute inset-e-0 inset-bs-0 -z-1 translate-x-[29.5%] -translate-y-8.25 opacity-30 max-block-full max-inline-full" />

			<div class="mx-auto grid grid-rows-[1fr_auto] items-center gap-4 max-inline-lg min-block-svh md:max-inline-6xl">
				<main class="">
					<Outlet />
				</main>

				<Footer />
			</div>
		</div>
	);
}
