import type { JSX } from "solid-js";

import { useFormContext } from "#/hook/form-context";

import { Button } from "#/components/ui/kobalte-button";

interface Props {
	label: JSX.Element;
	labelSubmitting: JSX.Element;
}

export const SubmitButton = (props: Props) => {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button
					type="submit"
					disabled={isSubmitting()}
					class="text-sm font-extrabold tracking-500 uppercase">
					{isSubmitting() ? props.labelSubmitting : props.label}
				</Button>
			)}
		</form.Subscribe>
	);
};
