import { onCleanup, createEffect, createSignal } from "solid-js";

export function createCapslock() {
	const [isCapsLockPressed, setIsCapslockPressed] = createSignal(false);

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.getModifierState("CapsLock")) {
			setIsCapslockPressed(true);
		} else {
			setIsCapslockPressed(false);
		}
	};

	createEffect(() => {
		document.addEventListener("keydown", handleKeydown);

		onCleanup(() => document.removeEventListener("keydown", handleKeydown));
	});

	return isCapsLockPressed;
}
