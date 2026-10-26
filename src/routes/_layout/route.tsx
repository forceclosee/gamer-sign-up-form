import { createFileRoute, Outlet } from "@tanstack/solid-router";

import { Footer } from "#/components/layout/footer";

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div class="mx-auto grid grid-rows-[1fr_auto] gap-4 max-inline-6xl min-block-svh">
			<Outlet />
			<Footer />
		</div>
	);
}
