import { createFileRoute, redirect } from "@tanstack/solid-router";

export const Route = createFileRoute("/_layout/")({
	beforeLoad: () => {
		throw redirect({ to: "/signup" });
	},
	component: Home,
});

function Home() {
	return null;
}
