import { Footer } from "#/components/layout/footer";
import { createFileRoute, Outlet } from "@tanstack/solid-router";

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Outlet />
			<Footer />
		</div>
	);
}
