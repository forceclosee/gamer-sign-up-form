import { Footer } from "#/components/layout/footer";
import { createFileRoute, Outlet } from "@tanstack/solid-router";

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div class="mx-auto grid grid-rows-[1fr_auto] max-inline-360 min-block-svh">
			<Outlet />
			<Footer />
		</div>
	);
}
