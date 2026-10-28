import { For } from "solid-js";
import { Toast } from "@msviderok/base-ui-solid/toast";
import { X } from "lucide-solid";
import { Portal } from "solid-js/web";

export type ToastOptions = Partial<Omit<Toast.Root.ToastObject, "type">>;

export type ToastType =
	| "default"
	| "success"
	| "error"
	| "info"
	| "warning"
	| "loading";

type ToastManager = ReturnType<typeof Toast.createToastManager>;

export const toastManager = Toast.createToastManager();

const createToastApi = (manager: ToastManager) => {
	const createTypedToast = (type: ToastType) => {
		return (input: string | ToastOptions) => {
			const opts = typeof input === "string" ? { description: input } : input;
			return manager.add({ ...opts, type });
		};
	};

	return {
		default: createTypedToast("default"),
		success: createTypedToast("success"),
		error: createTypedToast("error"),
		update: manager.update,
		remove: manager.close,
		promise: manager.promise,
		add: manager.add,
	};
};

export const stackedToast = createToastApi(toastManager);

export const StackedToastProvider = (props: Toast.Provider.Props) => {
	return (
		<Toast.Provider toastManager={toastManager} {...props}>
			{props.children}
			<StackedToastList />
		</Toast.Provider>
	);
};

const StackedToastList = () => {
	const { toasts } = Toast.useToastManager();

	return (
		<Portal>
			<Toast.Viewport class="base-toast-viewport fixed inset-e-4 inset-be-4 z-1 inline-[calc(100vw-2rem)] max-inline-90">
				<For each={toasts()}>
					{(toast) => (
						<Toast.Root
							toast={toast}
							data-type={toast.type}
							class="base-stacked-toast-root group">
							<div class="flex items-start justify-between gap-4 overflow-hidden p-4 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-behind:opacity-0 group-data-expanded:opacity-100">
								<div class="grid gap-1">
									<Toast.Title class="text-sm font-medium" />
									<Toast.Description />
								</div>

								<Toast.Close>
									<X
										strokeWidth={3}
										class="text-text-inverse block-4 inline-auto"
									/>
								</Toast.Close>
							</div>
						</Toast.Root>
					)}
				</For>
			</Toast.Viewport>
		</Portal>
	);
};
