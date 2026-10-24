import { Button } from "#/components/ui/kobalte-button";
import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/_layout/")({ component: Home });

function Home() {
	return (
		<div class="p-8">
			<h1 class="text-4xl font-bold">Welcome to TanStack Start</h1>
			<p class="mt-4 text-lg text-text-muted">
				Edit <code>src/routes/index.tsx</code> to get started.
			</p>
			<Button>button</Button>
		</div>
	);
}
