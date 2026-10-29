import {
	createFileRoute,
	getRouteApi,
	redirect,
	useNavigate,
} from "@tanstack/solid-router";
import { createSignal } from "solid-js";
import { Show } from "solid-js";

import { authClient } from "#/lib/auth-client";

import { SuccessIcon } from "#/components/icons/success-icon";
import { Button } from "#/components/ui/kobalte-button";

export const Route = createFileRoute("/_layout/_auth/welcome")({
	beforeLoad: async ({ context }) => {
		if (!context.user) {
			throw redirect({
				to: "/login",
			});
		}
	},

	head: () => ({
		meta: [{ title: "Welcome | NEONCORE" }],
	}),

	component: RouteComponent,
});

const rootRouteApi = getRouteApi("__root__");

function RouteComponent() {
	const authContext = rootRouteApi.useRouteContext();

	const navigate = useNavigate();

	const [isLoading, setIsloading] = createSignal(false);

	const handleLogout = async () => {
		setIsloading(true);

		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					navigate({ to: "/signup", replace: true });
				},
			},
		});

		setIsloading(false);
	};

	return (
		<div class="mx-auto grid items-center px-4 py-8.5 inline-full max-inline-lg">
			<div class="@container/welcome relative grid items-center border border-border bg-bg-card min-block-113.75">
				<div class="px-[clamp(1.1875rem,-10.2454rem+48.7804cqw,2.4375rem)] py-[clamp(1.875rem,-2.6981rem+19.5121cqw,2.375rem)]">
					<SuccessIcon class="-ms-3.5 block-auto inline-max" />

					<h1 class="mbs-5 font-sans text-2xl font-semibold tracking-wider text-text uppercase">
						<span class="me-2 inline-block text-primary">{"//"}</span>
						Handshake complete
					</h1>

					<p class="mbs-4.5 text-base">
						Operator{" "}
						<span class="text-primary">{authContext().user?.username}</span>{" "}
						provisioned. Your account is ready.
					</p>

					<Button
						variant="danger"
						disabled={isLoading()}
						onClick={handleLogout}
						class="mbs-7.75 text-sm font-extrabold tracking-500 uppercase inline-full">
						<Show when={isLoading()} fallback="Logout">
							<span class="loader" data-label="LOGGING OUT"></span>
						</Show>
					</Button>
				</div>
			</div>
		</div>
	);
}
