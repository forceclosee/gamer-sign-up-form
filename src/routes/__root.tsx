import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/solid-router";

import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";

import { HydrationScript } from "solid-js/web";
import { Suspense } from "solid-js";

import favicon from "/favicon.png";
import globalCss from "#/styles/global.css?url";

import { getSession } from "#/utils/auth.function";

import { StackedToastProvider } from "#/components/ui/base-toast";

// Orbitron variable 400 - 900
import "@fontsource-variable/orbitron";

// Jetbrains mono variable 100 - 800
import "@fontsource-variable/jetbrains-mono";

export const Route = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0",
			},
			{
				title: "NEONCORE",
			},
			{
				name: "author",
				content: "Force Close",
			},
			{
				name: "description",
				content: "NEONCORE - a competitive-gaming network",
			},

			// OG Tags
			{
				property: "og:title",
				content: "NEONCORE",
			},
			{
				property: "og:description",
				content: "NEONCORE - a competitive-gaming network",
			},
			{
				property: "og:image",
				content:
					"https://res.cloudinary.com/dspqgpnvq/image/upload/v1793256148/gamer-signup-form_mtkcij.png",
			},
			{
				property: "og:url",
				content: "https://gamer-sign-up-form.forceclose.workers.dev",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:site_name",
				content: "Force Close Portfolio",
			},
		],
		links: [
			// favicon
			{
				rel: "icon",
				href: favicon,
				type: "image/png",
			},

			// css
			{
				rel: "stylesheet",
				href: globalCss,
			},
		],
	}),

	beforeLoad: async () => {
		const session = await getSession();

		return { user: session?.user };
	},

	component: RootComponent,
});

function RootComponent() {
	return (
		<html lang="en" class="bg-bg-page text-text-muted">
			<head>
				<HydrationScript />
				<HeadContent />
			</head>
			<body>
				<Suspense>
					<StackedToastProvider>
						<Outlet />
					</StackedToastProvider>

					<TanStackRouterDevtools />
				</Suspense>
				<Scripts />
			</body>
		</html>
	);
}
