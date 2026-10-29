import { getPartialFormState } from "#/lib/store/form-state.store";
import { SuccessIcon } from "#/components/icons/success-icon";
import { Link } from "#/components/ui/link";

export const SuccessCard = () => {
	const callsign = getPartialFormState("callsign");

	return (
		<>
			<SuccessIcon class="-ms-3.5 block-auto inline-max" />

			<h2 class="mbs-5 font-sans text-2xl font-semibold tracking-wider text-text uppercase">
				<span class="me-2 inline-block text-primary">{"//"}</span>
				Handshake complete
			</h2>

			<p class="mbs-4.5 text-base">
				Operator <span class="text-primary">{callsign()}</span> provisioned.
				Your account is ready.
			</p>

			<Link
				to="/login"
				class="mbs-7.75 text-sm font-extrabold tracking-500 uppercase">
				Continue to log in
			</Link>
		</>
	);
};
