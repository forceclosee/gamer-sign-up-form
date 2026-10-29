import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from '@cloudflare/vite-plugin'
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";
import { nitro } from "nitro/vite";

export default defineConfig({
	resolve: { tsconfigPaths: true },
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
		devtools(),
		nitro(),
		tailwindcss(),
		tanstackStart(),
		solidPlugin({ ssr: true }),
	],
});
