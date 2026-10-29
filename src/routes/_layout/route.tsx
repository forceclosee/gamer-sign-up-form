import { createFileRoute, Outlet } from "@tanstack/solid-router";

import { Footer } from "#/components/layout/footer";

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div class="isolate overflow-clip max-inline-svw">
			<div class="mx-auto grid grid-rows-[1fr_auto] gap-4 max-inline-lg min-block-svh md:max-inline-6xl">
				<Outlet />
				<Footer />
			</div>
		</div>
	);
}
