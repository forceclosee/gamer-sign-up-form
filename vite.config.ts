import { defineConfig, type Plugin } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

const ssrWithoutBrowserCondition: Plugin = {
	name: "ssr-without-browser-condition",
	enforce: "post",
	configEnvironment(name, config) {
		if (name === "ssr" && config.resolve?.conditions) {
			config.resolve.conditions = config.resolve.conditions.filter(
				(condition) => condition !== "browser",
			);
		}
	},
};

export default defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		devtools(),
		tailwindcss(),
		tanstackStart(),
		solidPlugin({ ssr: true }),
		ssrWithoutBrowserCondition,
	],
});
