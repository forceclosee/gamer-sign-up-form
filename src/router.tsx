import { createRouter as createTanStackRouter } from "@tanstack/solid-router";
import { routeTree } from "#/routeTree.gen";

import { Link } from "#/components/ui/link";
import { Button } from "#/components/ui/kobalte-button";

export function getRouter() {
	const router = createTanStackRouter({
		routeTree,

		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultNotFoundComponent: () => {
			return (
				<div class="flex flex-col items-center justify-center gap-6 p-8 text-center text-base text-text min-block-svh">
					<span class="text-4xl font-medium">404</span>
					<h1 class="mbs-8 font-medium">Page Not Found</h1>
					<p class="mbs-12">
						The page you are looking for doesn't exist. Click button bellow to
						go to the homepage
					</p>
					<Link to="/">Back To Homepage</Link>
				</div>
			);
		},
		defaultErrorComponent: ({ reset }) => {
			return (
				<div class="flex flex-col items-center justify-center gap-6 p-8 text-center text-base min-block-svh">
					<p class="text-text-error">Something went wrong</p>
					<Button
						onClick={() => {
							reset();
						}}>
						Try again
					</Button>
				</div>
			);
		},
	});

	return router;
}

declare module "@tanstack/solid-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
